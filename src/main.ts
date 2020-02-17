import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';
async function bootstrap() {
	const httpsOptions = {
		key: fs.readFileSync(join(__dirname, '..', 'cert/privkey.pem')),
		cert: fs.readFileSync(join(__dirname, '..', 'cert/cert.pem')),
	};
	// ! TODO: cors need to be removed
	const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true, httpsOptions });
	app.useStaticAssets(join(__dirname, '..', 'public/uploaded_images'), { prefix: '/public/uploaded_images' });
	app.useStaticAssets(join(__dirname, '..', 'public/uploaded_audios'), { prefix: '/public/uploaded_audios' });
	app.useStaticAssets(join(__dirname, '..', 'public/main_client'), { prefix: '/public/main_client' });

	// ! TODO: limit need to be removed
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
	await app.listen(80);
}
bootstrap();
