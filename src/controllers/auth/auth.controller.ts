import { Controller, Post, Get, Body, Logger, UseFilters, BadRequestException, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { AuthCredentialsDto } from '../../dtos/auth-credentials.dto';
import { MongoExceptionFilter } from '../../exception-filters/mongo.ef';
import { MongoError } from 'mongodb';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }
	@Post()
	@UseFilters(MongoExceptionFilter)
	signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any> {
		return this.authService.signUp(authCredentialsDto)
			.catch(error => {
				if (error.name === 'MongoError') {
					throw new MongoError({ error });
				}
			});
	}
}
