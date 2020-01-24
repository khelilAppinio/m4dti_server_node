import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectedClientsHistoryModule } from './modules/connected-clients-history/connected-clients-history.module';
import { MessageModule } from './modules/message/message.module';
import { ImageUploadController } from './controllers/image-upload/image-upload.controller';
import { ConnectedClientsHistoryController } from './controllers/connected-clients-history/connected-clients-history.controller';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/nestFirst'),
		ConnectedClientsHistoryModule,
		MessageModule,
	],
	controllers: [ImageUploadController, ConnectedClientsHistoryController],
	providers: [ChatGateway],
})
export class AppModule { }
