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
		const createduser = new this.userModel(authCredentialsDto);
		createduser.password = await this.hashPassword(createduser.password, salt);
		Logger.log(createduser);
		return createduser.save();
	}

	private async hashPassword(password: string, salt: string): Promise<string> {
		return hash(password, salt);
	}
}
