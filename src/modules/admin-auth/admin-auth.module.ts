import { Module } from '@nestjs/common';
import { AdminAuthController } from '../../controllers/admin-auth/admin-auth.controller';
import { AuthService } from '../../services/admin-auth/admin-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { FacebookStrategy } from '../../strategies/facebook.strategy';
import { GoogleStrategy } from '../../strategies/google.strategy';
@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'm4dtiSecretKey',
			signOptions: {
				expiresIn: 3600,
			},
		}),
	],
	controllers: [AdminAuthController],
	providers: [AuthService, JwtStrategy, GoogleStrategy, FacebookStrategy],
	exports: [JwtStrategy, JwtModule],
})
export class AdminAuthModule { }
