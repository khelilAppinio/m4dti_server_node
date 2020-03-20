import { Controller, Post, Body, Res, HttpStatus, Logger, Get, Header } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import * as uuid from 'uuid/v4';
import { MessageService } from '../../services/message/message.service';
import { ChatGateway } from '../../chat/chat.gateway';
import { ENV } from 'src/env/environment';
@Controller('audio-upload')
export class AudioUploadController {

	constructor(private readonly messageService: MessageService, private readonly chatGateway: ChatGateway) { }
	@Post()
	@Header('Access-Control-Allow-Origin', '*')
	// ! TODO: need a dto here
	writeaudio(
		@Body('data') data: string,
		// * get sourceSocketId from client
		@Body('sourceSocketId') sourceSocketId: string,
		@Body('name') name: string,
		@Res() res: Response,
	) {
		// ! TODO: use regex to filter 3gpp| ..
		// ! TODO: validate data
		// ! TODO: add remove audio feature for both front and back
		// ! TODO: verify audio too large
		const audioId = uuid();
		const date = new Date().getTime();
		const match = data.slice(0, 20).match(/(3gpp)/);
		if (match) {
			const audioExtension = '3gpp';
			fs.writeFile(
				path.join(__dirname, `../../../public/uploaded_audios/${audioId}.${audioExtension}`),
				data.replace(/^data:video\/3gpp;base64,/, ''),
				'base64', (error) => {
					if (error) {
						Logger.error(error);
						return res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).send();
					}
					// send recieved media from a client to the main client
					const mediaUrl = `${ENV.API_URL}:${ENV.API_PORT}/public/uploaded_audios/${audioId}.${audioExtension}`;
					// * send media url to the destination
					this.chatGateway.sendMedia(mediaUrl, sourceSocketId, date, name);
					return res.status(HttpStatus.OK).send({ mediaUrl });
				},
			);
		} else {
			return res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).send();
		}

	}
}
