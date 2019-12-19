import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(4444) // WebSocket port number: 4444
export class ChatGateway implements OnGatewayInit, OnGatewayDisconnect { // can implemet also OnGatewayConnection

	private logger: Logger = new Logger('ChatGetway');
	private mainClient: Socket;
	private mainClientConnected = false;
	private clientsList: Array<{ client: Socket, username: string }> = [];

	afterInit(server: Server) {
		this.logger.log('ChatGetway init');
	}

	handleDisconnect(client: Socket) {
		if (this.mainClientConnected && client.id === this.mainClient.id) {
			// ! TODO: broadcasting main client is off to client list members
			this.logger.log('[handleDisconnect] Main client disconnected');
		} else {
			this.clientsList = this.clientsList.filter(fclient => {
				if (fclient.client.id === client.id) {
					this.logger.log('[handleDisconnect] client disconnected: ' + fclient.username);
					return false;
				}
				return true;
			});
			// tell main client of the new list
			if (this.mainClientConnected) { // if main client is connected
				this.mainClient.emit('online_clients', {
					connectedClients: this.clientsList.map(fclient => {
						return { username: fclient.username, sourceSocketId: fclient.client.id };
					}),
				});
			}

		}
	}

	@SubscribeMessage('messageFromMainClientToServer')
	handleMessageFromMainClient(client: Socket, data: { userSourceSocketId: string, userId: string, username: string, body: string }): WsResponse<string> | void {
		const target = this.clientsList.find(fclient => fclient.client.id === data.userSourceSocketId);
		if (target) {
			target.client.emit('messageFromMainClientToClient', { body: data.body });
			// ! TODO: delete target variable;
		}
		return { event: 'messageFromServerToMainClient', data: 'recieved in server' };
	}

	@SubscribeMessage('messageFromClientToServer')
	handleMessageFromClient(client: Socket, text: string): WsResponse<string> {
		this.mainClient.emit('messageFromClientToMainClient', { body: text, admin: false, date: new Date().toDateString(), sourceSocketId: client.id });
		return { event: 'messageFromServerToClient', data: 'recieved in server' };
	}

	@SubscribeMessage('messageInitFromClient')
	handleInitMessageFromClient(client: Socket, username: string): WsResponse<{ mainClientIsConnected: boolean }> {
		this.logger.log('client connected: ' + username + ' -- id: ' + client.id);
		this.clientsList.push({
			username,
			client,
		});
		// tell main client that there is a new connected client
		if (this.mainClientConnected) { // if main client is connected
			this.mainClient.emit('online_clients', {
				connectedClients: this.clientsList.map(fclient => {
					return { username: fclient.username, sourceSocketId: fclient.client.id };
				}),
			});
		} // ! TODO: put it in the db for main client as unread

		// tell client the status of the main client
		return { event: 'messageFromServerToClient', data: { mainClientIsConnected: this.mainClientConnected } };
	}

	@SubscribeMessage('messageInitFromMainClient')
	handleInitMessageFromMainClient(client: Socket, text: string): WsResponse<{ connectedClients: Array<{ username: string, sourceSocketId: string }> }> {
		this.logger.log('Main client connected: ' + text);
		this.mainClientConnected = true;
		this.mainClient = client;
		return {
			event: 'online_clients', data: {
				connectedClients: this.clientsList.map(fclient => {
					return { username: fclient.username, sourceSocketId: fclient.client.id };
				}),
			},
		};
	}
}
