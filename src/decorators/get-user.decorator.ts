import { createParamDecorator, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { User } from '../models/users.model';
import { Request } from 'express';

const httpService = new HttpService();

export const GetUser = createParamDecorator(async (data, req: Request): Promise<User> => {
	
	
	const headers = req.headers;
	const accessToken = headers['access-token'];
	const provider = headers['token-provider'];
	if (accessToken && provider) {
		if (provider === 'line') {
			try {
				let response = await httpService.get('https://api.line.me/oauth2/v2.1/verify?access_token=' + accessToken).toPromise();
				if (response.status === 200) {
					try {
						response = await httpService.get('https://api.line.me/v2/profile', { headers: { Authorization: 'Bearer ' + accessToken } }).toPromise();
						if (response.status === 200) {
							if (response.data && response.data.userId && response.data.displayName && response.data.pictureUrl) {
								// tslint:disable-next-line: variable-name
								const provider_user_id = response.data.userId;
								const name = response.data.displayName;
								// tslint:disable-next-line: variable-name
								const profile_picture = response.data.pictureUrl;
								return {
									role: 'user',
									provider,
									provider_user_id,
									name,
									profile_picture,
								};
							}
						}
					} catch (error) {
						throw new HttpException('internal provider api error', HttpStatus.SERVICE_UNAVAILABLE);
					}
				}
			} catch (error) {
				throw new HttpException('couldn\'t access to provider', HttpStatus.SERVICE_UNAVAILABLE);
			}

		} else {
			throw new HttpException('provider not supported', HttpStatus.NOT_IMPLEMENTED);
		}
	} else {
		throw new HttpException('access-token and/or provider empty', HttpStatus.BAD_REQUEST);
	}
});
