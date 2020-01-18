import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectedClientsHistoryModule } from './modules/connected-clients-history/connected-clients-history.module';
import { MessageModule } from './modules/message/message.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/nestFirst'),
		ConnectedClientsHistoryModule,
		MessageModule,
	],
	controllers: [],
	providers: [ChatGateway],
})
export class AppModule { }
