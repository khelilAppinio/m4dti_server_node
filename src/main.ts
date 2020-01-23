import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
	// ! TODO: cors need to be removed
	const app = await NestFactory.create(AppModule, { cors: true });
	// ! TODO: limit need to be removed
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
	await app.listen(3000);
}
bootstrap();
