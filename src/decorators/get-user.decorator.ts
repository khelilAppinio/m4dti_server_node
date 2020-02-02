import { createParamDecorator } from '@nestjs/common';
import { User } from '../models/users.model';

export const GetUser = createParamDecorator((data, req): User => {
	return req.user;
});
