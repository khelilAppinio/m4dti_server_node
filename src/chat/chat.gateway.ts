import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(4444) // WebSocket port number: 4444
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	private logger: Logger = new Logger('ChatGetway');
	private mainClient: Socket;
	private cliensList: Socket[] = [];
	afterInit(server: Server) {
		this.logger.log('ChatGetway init');
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
		this.cliensList.push(client);
	}
	handleDisconnect(client: Socket) {
		this.cliensList = this.cliensList.filter( fclient => fclient.id !== client.id);
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('messageFromMainClientToServer')
	handleMessageFromMainClient(client: Socket, data: string): WsResponse<string> | void {
			this.logger.log(this.cliensList.length);
			this.mainClient = client;
			// const target = this.cliensList.find( fclient => fclient.id === data.to );
			const target = this.cliensList[0];
			this.logger.log(target.id);
			if (target) {
				this.logger.log(target.emit('messageFromMainClientToClient', data));
			}
			// return { event: 'messageFromServerToMainClient', data: 'MainClienFirstHandshake' };

	}

	@SubscribeMessage('messageFromClientToServer')
	handleMessageFromClient(client: Socket, text: string): WsResponse<string> {
		this.mainClient.emit('messageFromClientToMainClient', text);
		return { event: 'messageFromServerToClient', data: 'recieved in server' };
	}
}
