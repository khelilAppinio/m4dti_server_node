import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../../models/users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    public async saveProvidedUser(user: User): Promise<User> {
        try {
            const _user = await this.userModel.findOne({name: user.name});
            if (_user) {
                return _user;
            } else {
                const newUser = new this.userModel({...user});
                try {
                    await newUser.save();
                    return user;
                } catch (error) {
                    throw new HttpException('could not reach the database', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        } catch (error) {
            throw new HttpException('could not reach the database', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
