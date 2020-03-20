import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialsDto } from '../../dtos/auth-credentials.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/users.model';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../types/jwt-payload.type';
import { MongoError } from 'mongodb';

export enum Provider {
    GOOGLE = 'google',
    FACEBOOK = 'facebook'
}

@Injectable()
export class AuthService {
	constructor(
		@InjectModel('User') private readonly userModel: Model<User>,
		private readonly jwtService: JwtService,
	) { }
	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string } | MongoError> {
		const salt = await genSalt();
		const createduser = new this.userModel({ ...authCredentialsDto, salt });
		createduser.password = await hash(createduser.password, salt);
		try {
			const { name } = await createduser.save();
			const payload: JwtPayload = { name };
			const accessToken = this.jwtService.sign(payload);
			return { accessToken };
		} catch (error) {
			throw {...error, name: 'MongoError'}
		}
	}
	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string | { accessToken: string }> {
		const isPasswordValid = await this.validateUserPassword(authCredentialsDto.name, authCredentialsDto.password);
		if (isPasswordValid) {
			const payload: JwtPayload = { name: authCredentialsDto.name };
			const accessToken = this.jwtService.sign(payload);
			return Promise.resolve({ accessToken });
		} else {
			return Promise.reject('Invalid credentials');
		}
	}
	private async validateUserPassword(name: string, password: string): Promise<boolean> {
		const user = await this.userModel.findOne({ name });
		return (user && await hash(password, user.salt) === user.password);
	}
	public async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
        try {
            // You can add some registration logic here,
            // to register the user using their thirdPartyId (in this case their googleId)
            // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

            // if (!user)
                // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);
            const payload = {
                thirdPartyId,
                provider,
            };

            const jwt: string = this.jwtService.sign(payload);
            return jwt;
        } catch (err) {
            throw new InternalServerErrorException('validateOAuthLogin', err.message);
        }
    }
}
