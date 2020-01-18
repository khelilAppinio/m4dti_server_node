import { Module } from '@nestjs/common';
import { MessageService } from '../../services/message/message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../../schemas/message.schema';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])],
	providers: [MessageService],
	exports: [MessageService],
})
export class MessageModule {}
