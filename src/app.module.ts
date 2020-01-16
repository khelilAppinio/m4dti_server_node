import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forRoot('mongodb://localhost/nestFirst')],
	controllers: [],
	providers: [ChatGateway],
})
export class AppModule { }
