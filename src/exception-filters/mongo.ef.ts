import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, Logger, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
	catch(exception: {error: MongoError, name: string}, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse();
		if (exception.error.code === 11000) {
			response.status(HttpStatus.CONFLICT).json({ message: 'User already exists.' });
		} else {
			response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal error.' });
		}
	}
}
