import { Injectable } from '@nestjs/common';
import { Message } from '../../models/message.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from '../../dtos/create-message-dto';

@Injectable()
export class MessageService {
	constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

	async create(createMessageDto: CreateMessageDto): Promise<Message> {
		const createdMessage = new this.messageModel(createMessageDto);
		return createdMessage.save();
	}
}