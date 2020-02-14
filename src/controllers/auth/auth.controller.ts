import { Controller, Post, Get, Body, UseFilters, ValidationPipe, UnauthorizedException, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { AuthCredentialsDto } from '../../dtos/auth-credentials.dto';
import { MongoExceptionFilter } from '../../exception-filters/mongo.ef';
import { MongoError } from 'mongodb';
import { UnauthorizedFilter } from '../../exception-filters/unauthorized.filter';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../decorators/get-user.decorator';
import { User } from '../../models/users.model';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }
	@Post('signup')
	@UseFilters(MongoExceptionFilter)
	signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any> {
		return this.authService.signUp(authCredentialsDto)
			.catch(error => {
				if (error.name === 'MongoError') {
					throw new MongoError({ error });
				}
			});
	}

	@Post('login')
	@UseFilters(UnauthorizedFilter, MongoExceptionFilter)
	signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<any> {
		return this.authService.signIn(authCredentialsDto)
			.catch(error => {
				if (error.name === 'MongoError') {
					throw new MongoError({ error });
				} else {
					throw new UnauthorizedException(error);
				}
			});
	}

	@Get('isLoggedIn')
	@UseGuards(AuthGuard())
	testAuth(@GetUser() user: User) {
		return (user) ? true : false;
	}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	googleLogin() {
		// initiates the Google OAuth2 login flow
	}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	googleLoginCallback(@Req() req, @Res() res) {
		// handles the Google OAuth2 callback
		const jwt: string = req.user.jwt;
		if (jwt) {
			res.redirect('http://localhost:4200/login/succes/' + jwt);
			//return {accessToken: jwt};
		} else {
			res.redirect('http://localhost:4200/login/failure');
			//return new UnauthorizedException();
		}
	}

	@Get('facebook')
	@UseGuards(AuthGuard('facebook'))
	facebookLogin() {
		// initiates the Google OAuth2 login flow
	}

	@Get('facebook/callback')
	@UseGuards(AuthGuard('facebook'))
	facebookLoginCallback(@Req() req, @Res() res) {
		// handles the Google OAuth2 callback
		const jwt: string = req.user.jwt;
		if (jwt) {
			res.redirect('http://localhost:4200/login/succes/' + jwt);
			//return {accessToken: jwt};
		} else {
			res.redirect('http://localhost:4200/login/failure');
			//return new UnauthorizedException();
		}
	}
}
