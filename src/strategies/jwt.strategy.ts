import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/users.model';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: 'm4dtiSecretKey',
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { name } = payload;
		const user = await this.userModel.findOne({name});
		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
