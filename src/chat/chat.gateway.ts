import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ConnectedClientsHistoryService } from '../services/connected-clients-history/connected-clients-history.service';
import { MessageService } from '../services/message/message.service';
import { DataFromMainClient } from '../types/emittable';

@WebSocketGateway(4444) // WebSocket port number: 4444
export class ChatGateway implements OnGatewayInit, OnGatewayDisconnect { // can implemet also OnGatewayConnection

	@WebSocketServer() private server: Server;
	private logger: Logger = new Logger('ChatGetway');
	private mainClient: Socket;
	private mainClientConnected = false;
	private clientsList: Array<{ client: Socket, username: string }> = [];

	constructor(
		private readonly connectedClientsHistoryService: ConnectedClientsHistoryService,
		private readonly messageService: MessageService,
	) { }
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
					this.connectedClientsHistoryService.update(fclient.username, false, undefined)
						.then(res => { })
						.catch(err => this.logger.warn('err'));
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
	handleMessageFromMainClient(client: Socket, data: DataFromMainClient): WsResponse<string> | void {
		const target = this.clientsList.find(fclient => fclient.client.id === data.userSourceSocketId);
		if (target) {
			const date = new Date().getTime();
			target.client.emit('messageFromMainClientToClient', { body: data.body });
			// persist message in the db
			this.messageService.create({ isAdmin: true, username: data.username, body: data.body, date, mediaUrl: undefined, unread: true });
		}
		return { event: 'messageFromServerToMainClient', data: 'recieved in server' };
	}

	@SubscribeMessage('messageFromClientToServer')
	handleMessageFromClient(client: Socket, data: { text: string, username: string }): WsResponse<string> {
		let emitted = false;
		const date = new Date().getTime();
		this.logger.log(this.mainClient.id, 'messageFromClientToServer - main client id');

		// ! TODO: make sure is emitted
		this.mainClient.emit('messageFromClientToMainClient', {
			body: data.text,
			admin: false,
			date,
			sourceSocketId: client.id,
			mediaUrl: undefined,
		});
		this.logger.log(data, 'handleMessageFromClient - emitted');

		// persist message in the db
		this.messageService.create({ isAdmin: false, username: data.username, body: data.text, date, mediaUrl: undefined, unread: true });
		return { event: 'messageFromServerToClient', data: 'recieved in server' };
	}

	@SubscribeMessage('messageInitFromClient')
	handleInitMessageFromClient(client: Socket, username: string): WsResponse<{ mainClientIsConnected: boolean }> {
		this.logger.log('client connected: ' + username + ' -- id: ' + client.id);
		this.clientsList.push({
			username,
			client,
		});
		// ! TODO: handle error
		this.connectedClientsHistoryService.update(username, true, client.id)
			.then(res => { })
			.catch(err => this.logger.warn('err'));
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
	// tslint:disable-next-line: max-line-length
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

	public sendMedia(mediaUrl: string, destination: string, date: number, username: string) {
		// ! TODO: verify if main client is online otherwise set message as unread and persist
		if (this.mainClientConnected) {
			this.mainClient.emit('messageFromClientToMainClient', {
				body: undefined, // ! TODO: add these featuer later
				admin: false,
				date,
				mediaUrl,
				sourceSocketId: destination,
			});
		} // ? else...
		// * save in the db as message
		this.messageService.create({ isAdmin: false, username, body: undefined, date, mediaUrl, unread: true });
	}
}
