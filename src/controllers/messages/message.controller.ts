import { Controller, Get, Param, Query } from '@nestjs/common';
import { MessageService } from '../../services/message/message.service';

@Controller('messages')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}
	@Get(':id')
	getClientMessagesById(@Param() params, @Query() query: any) {
		return this.messageService.getMessagesById(params.id, query.isAdmin);
	}
}
