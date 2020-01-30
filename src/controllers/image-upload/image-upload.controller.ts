import { Controller, Post, Body, Res, HttpStatus, Logger, Get, Header } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import * as uuid from 'uuid/v4';
import { MessageService } from '../../services/message/message.service';
import { ChatGateway } from '../../chat/chat.gateway';
import { ENV } from 'src/env/environment';
@Controller('image-upload')
export class ImageUploadController {

	constructor(private readonly messageService: MessageService, private readonly chatGateway: ChatGateway) { }
	@Post()
	@Header('Access-Control-Allow-Origin', '*')
	// ! TODO: need a dto here
	writeImage(
		@Body('data') data: string,
		// * get sourceSocketId from client
		@Body('sourceSocketId') sourceSocketId: string,
		@Body('username') username: string,
		@Res() res: Response,
	) {
		// ! TODO: use regex to filter png|jpeg|jpg ..
		// ! TODO: validate data
		// ! TODO: add remove image feature for both front and back
		// ! TODO: verify image too large
		const imgId = uuid();
		const date = new Date().getTime();
		const match = data.slice(0, 20).match(/(png|jpg|jpeg)/);
		if (match) {
			const imgExtension = match[0];
			const regex = new RegExp(`^data:image\/${imgExtension};base64,`);
			fs.writeFile(
				path.join(__dirname, `../../../public/uploaded_images/${imgId}.${imgExtension}`),
				data.replace(regex, ''),
				'base64', (error) => {
					if (error) {
						Logger.error(error);
						return res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).send();
					}
					// send recieved media from a client to the main client
					const mediaUrl = `${ENV.API_URL}:${ENV.API_PORT}/public/uploaded_images/${imgId}.${imgExtension}`;
					// * send media url to the destination
					this.chatGateway.sendMedia(mediaUrl, sourceSocketId, date, username);
					return res.status(HttpStatus.OK).send({ mediaUrl });
				},
			);
		} else {
			return res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).send();
		}

	}
}
