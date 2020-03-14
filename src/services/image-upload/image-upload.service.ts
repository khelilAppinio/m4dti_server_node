import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid/v4';
import { ENV } from 'src/env/environment';
@Injectable()
export class ImageUploadService {
	public async saveImage(data: string): Promise<string> {
		const imgId = uuid();
		const match = data.slice(0, 20).match(/(png|jpg|jpeg)/);
		if (match) {
			const imgExtension = match[0];
            const regex = new RegExp(`^data:image\/.${imgExtension};base64,`);
            try {
                await fs.promises.writeFile(
                    path.join(__dirname, `../../../public/uploaded_images/${imgId}.${imgExtension}`),
                    data.replace(regex, ''),
                    'base64'
                );
                // send recieved media from a client to the main client
					const mediaUrl = `${ENV.API_URL}:${ENV.API_PORT}/public/uploaded_images/${imgId}.${imgExtension}`;
					// * send media url to the destination
					return mediaUrl;
                
            } catch (error) {
					if (error) {
						Logger.error(error);
                        throw new HttpException('could not write image on server', HttpStatus.INTERNAL_SERVER_ERROR);
					}
					
            }
		} else {
            throw new HttpException('image type not supported', HttpStatus.UNSUPPORTED_MEDIA_TYPE);
		}
	}
}
