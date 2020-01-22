import { Controller, Post, Body, Res, HttpStatus, Logger, Get } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';

@Controller('image-upload')
export class ImageUploadController {
	@Post()
	writeImage(@Body('data') data: string, @Res() res: Response) {
		Logger.log('requesting', 'writeImage');
		fs.writeFile(
			path.join(__dirname, '../../../public/uploaded_images/1234.jpeg'),
			data.replace(/^data:image\/jpeg;base64,/, ''),
			'base64', (error) => {
				if (error) {
					Logger.error(error);
					return res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).send();
				}
				return res.status(HttpStatus.OK).send();
		});
	}
}
