import { Module } from '@nestjs/common';
import { ClientAuthController } from '../../controllers/client-auth/client-auth.controller';
import { ClientAuthService } from '../../services/client-auth/client-auth.service';
import { UserModule } from '../user/user.module';

@Module({
	imports: [UserModule],
	controllers: [ClientAuthController],
	providers: [ClientAuthService]
})
export class ClientAuthModule {}
