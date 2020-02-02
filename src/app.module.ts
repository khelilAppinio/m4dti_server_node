import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectedClientsHistoryModule } from './modules/connected-clients-history/connected-clients-history.module';
import { MessageModule } from './modules/message/message.module';
import { ImageUploadController } from './controllers/image-upload/image-upload.controller';
import { ConnectedClientsHistoryController } from './controllers/connected-clients-history/connected-clients-history.controller';
import { AudioUploadController } from './controllers/audio-upload/audio-upload.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost/nestFirst'),
		ConnectedClientsHistoryModule,
		MessageModule,
		AuthModule,
	],
	controllers: [ImageUploadController, ConnectedClientsHistoryController, AudioUploadController],
	providers: [ChatGateway],
})
export class AppModule { }
