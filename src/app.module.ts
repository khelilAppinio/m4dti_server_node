import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectedClientsHistoryModule } from './modules/connected-clients-history/connected-clients-history.module';
import { MessageModule } from './modules/message/message.module';
import { ImageUploadController } from './controllers/image-upload/image-upload.controller';
import { ConnectedClientsHistoryController } from './controllers/connected-clients-history/connected-clients-history.controller';
import { AudioUploadController } from './controllers/audio-upload/audio-upload.controller';
import { AdminAuthModule } from './modules/admin-auth/admin-auth.module';
import { ClientAuthModule } from './modules/client-auth/client-auth.module';
import { ReportModule } from './modules/report/report.module';
import { UserModule } from './modules/user/user.module';
import { ImageUploadService } from './services/image-upload/image-upload.service';

@Module({
	imports: [
		MongooseModule.forRoot(`mongodb://${process.env.MONGO_TARGET || 'localhost'}/nestFirst`),
		ConnectedClientsHistoryModule,
		MessageModule,
		AdminAuthModule,
		ClientAuthModule,
		ReportModule,
		UserModule
	],
	controllers: [ImageUploadController, ConnectedClientsHistoryController, AudioUploadController],
	providers: [ChatGateway, ImageUploadService],
})
export class AppModule { }
