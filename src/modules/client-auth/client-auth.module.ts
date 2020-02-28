import { Module, HttpModule } from '@nestjs/common';
import { ClientAuthController } from '../../controllers/client-auth/client-auth.controller';
import { ClientAuthService } from '../../services/client-auth/client-auth.service';

@Module({
	imports: [HttpModule],
	controllers: [ClientAuthController],
	providers: [ClientAuthService]
})
export class ClientAuthModule {}
