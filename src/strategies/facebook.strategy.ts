import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook'
import { AuthService, Provider } from '../services/admin-auth/admin-auth.service';
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {

    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            clientID    : '640104043486848',     // <- Replace this with your client id
            clientSecret: '075484ce5e94f990ef5224cade145ffa', // <- Replace this with your client secret
            callbackURL : 'http://thainest.informatik.uni-bremen.de:443/auth/facebook/callback',
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
