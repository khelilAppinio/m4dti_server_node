import { Injectable, Logger, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { AuthCredentialsDto } from '../../dtos/auth-credentials.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/users.model';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
@Injectable()
export class AuthService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
		const salt = await genSalt();
		const createduser = new this.userModel({...authCredentialsDto, salt});
		createduser.password = await hash(createduser.password, salt);
		return createduser.save();
	}
	async signIn(authCredentialsDto: AuthCredentialsDto) {
		const isPasswordValid = await this.validateUserPassword(authCredentialsDto.username, authCredentialsDto.password);
		if (isPasswordValid) {
			return 'bearer';
		} else {
			return Promise.reject('Invalid credentials');
		}
	}
	private async validateUserPassword(username: string, password: string): Promise<boolean> {
		const user = await this.userModel.findOne({username});
		return (user && await hash(password, user.salt) === user.password);
	}
}
