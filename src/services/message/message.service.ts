import { Injectable, Logger } from '@nestjs/common';
import { Message } from '../../models/message.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from '../../dtos/create-message-dto';

@Injectable()
export class MessageService {
	constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) { }

	async create(createMessageDto: CreateMessageDto): Promise<Message> {
		const createdMessage = new this.messageModel(createMessageDto);

		return createdMessage.save((err) => {
			if (err) {
				Logger.error(err, 'create message');// ! TODO: handle error
			}
		});
	}

	async getMessagesById(username: string, isAdmin: boolean): Promise<Message[]> {
		if (typeof isAdmin === 'undefined') {
			return this.messageModel.find({ username });
		} else {
			return this.messageModel.find({ username, isAdmin });
		}
	}

	async setAllReadToTrue(id: string) {
		return this.messageModel.updateMany({unread: true, username: id}, {unread: false});
	}
}
