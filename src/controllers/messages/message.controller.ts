import { Controller, Get, Param, Query, Patch, Logger } from '@nestjs/common';
import { MessageService } from '../../services/message/message.service';

@Controller('messages')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}
	@Get(':id')
	getClientMessagesById(@Param() params, @Query() query: any) {
		return this.messageService.getMessagesById(params.id, query.isAdmin);
	}
	// ! TODO: set all messages to read by user
	@Patch(':id')
	setAllMessagesToReadById(@Param() params) {
		Logger.log('saved', 'setAllMessagesToReadById');
		return this.messageService.setAllReadToTrue(params.id);
	}
}
