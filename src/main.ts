import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	// ! TODO: cors need to be removed
	const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
	app.useStaticAssets(join(__dirname, '..', 'public/uploaded_images'), { prefix: '/public/uploaded_images' });
	app.useStaticAssets(join(__dirname, '..', 'public/uploaded_audios'), { prefix: '/public/uploaded_audios' });

	// ! TODO: limit need to be removed
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
	await app.listen(3000);
}
bootstrap();
