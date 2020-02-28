import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService, Provider } from '../services/admin-auth/admin-auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            clientID    : '857619276645-j52p8thl4lfbofd6blce3olqli9lhr36.apps.googleusercontent.com',     // <- Replace this with your client id
            clientSecret: 'knkudjKuiiV-UTdfuVFg1zzn', // <- Replace this with your client secret
            callbackURL : 'http://thainest.informatik.uni-bremen.de:443/auth/google/callback',
            passReqToCallback: true,
            scope: ['email'],
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
        try {
            // console.log(profile);
            const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
            const user =
            {
                jwt,
            };

            done(null, user);
        } catch (err) {
            // console.log(err)
            done(err, false);
        }
    }

}
