import { Catch, ExceptionFilter, ArgumentsHost, BadRequestException, HttpStatus } from '@nestjs/common';

@Catch(BadRequestException)
export class UnauthorizedFilter implements ExceptionFilter {
	catch(exception: Error, host: ArgumentsHost) {
		const response = host.switchToHttp().getResponse();
		response.status(HttpStatus.UNAUTHORIZED).json({ message: exception.message });
	}
}
