import { Controller, Post, Body, Res, Header } from '@nestjs/common';

import { Response } from 'express';
import { ChatGateway } from '../../chat/chat.gateway';
import { ImageUploadService } from 'src/services/image-upload/image-upload.service';
@Controller('image-upload')
export class ImageUploadController {

	constructor(private readonly imageUploadService: ImageUploadService, private readonly chatGateway: ChatGateway) { }
	@Post()
	@Header('Access-Control-Allow-Origin', '*')
	// ! TODO: need a dto here
	async writeImage(
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
		const date = new Date().getTime();
		let mediaUrl = await this.imageUploadService.saveImage(data);
		this.chatGateway.sendMedia(mediaUrl, sourceSocketId, date, username);
		return { mediaUrl };
	}
}
