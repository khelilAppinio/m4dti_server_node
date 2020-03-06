import { Controller, Post, Headers, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { GetUser } from '../../decorators/get-user.decorator';
import { User } from '../../models/users.model';

@Controller('signup')
export class ClientAuthController {
	constructor(private readonly httpService: HttpService) { }
	@Post()
	async signup(@GetUser() user: User) {
		if (user) {
			return user;
		} else {
			throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
