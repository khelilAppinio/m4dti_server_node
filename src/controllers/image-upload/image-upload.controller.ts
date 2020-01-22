import { Controller, Post, Body, Res, HttpStatus, Logger, Get } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import * as uuid from 'uuid/v4';
import { MessageService } from '../../services/message/message.service';
import { ChatGateway } from '../../chat/chat.gateway';
@Controller('image-upload')
export class ImageUploadController {

	constructor(private readonly messageService: MessageService, private readonly chatGateway: ChatGateway) {}
	@Post()
	writeImage(@Body('data') data: string, @Body('sourceSocketId') sourceSocketId: string, @Res() res: Response) {
		// ! TODO: use regex to filter png|jpeg|jpg ..
		// ! TODO: save in the db as message
		// ! TODO: get sourceSocketId from client
		// ! TODO: validate data
		// ! TODO: add remove image feature for both front and back
		// ! TODO: send media url to the destination
		const imgId = uuid();
		const date = new Date().getTime();
		fs.writeFile(
			path.join(__dirname, `../../../public/uploaded_images/${imgId}.jpeg`),
			data.replace(/^data:image\/jpeg;base64,/, ''),
			'base64', (error) => {
				if (error) {
					Logger.error(error);
					return res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).send();
				}
				// send recieved media from a client to the main client
				this.chatGateway.sendMedia(imgId, sourceSocketId, date);
				return res.status(HttpStatus.OK).send({imgId});
		});
	}
}
