import { Module } from '@nestjs/common';
import { ChatGateway } from './app.gateway';

@Module({
	imports: [],
	controllers: [],
	providers: [ChatGateway],
})
export class AppModule { }
