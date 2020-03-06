import { Controller, Post, Headers, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { GetUser } from '../../decorators/get-user.decorator';
import { User } from '../../models/users.model';
import { UserService } from '../../services/user/user.service';

@Controller('signup')
export class ClientAuthController {
	constructor(private readonly userService: UserService) { }
	@Post()
	async signup(@GetUser() user: User) {
		if (user) {
			const _user = await this.userService.saveProvidedUser(user);
			return _user;
		} else {
			throw new HttpException('internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
