import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(4444) // WebSocket port number: 4444
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	private logger: Logger = new Logger('AppGetway');

	afterInit(server: Server) {
		this.logger.log('init');
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
	}
	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('messageFromMainClientToServer')
	handleMessageFromMainClient(client: Socket, text: string): WsResponse<string> {
		this.logger.log(`from main client: ${client.id}`);
		this.logger.log(`message recieved: ${text}`);
		return { event: 'messageFromServerToMainClient', data: 'mssg recieved!' };
	}

	@SubscribeMessage('messageFromClientToServer')
	handleMessageFromClient(client: Socket, text: string): WsResponse<string> {
		this.logger.log(`from client: ${client.id}`);
		this.logger.log(`message recieved: ${text}`);
		return { event: 'messageFromServerToClient', data: text };
	}
}
