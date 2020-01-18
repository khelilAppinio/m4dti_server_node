import { Module } from '@nestjs/common';
import { ConnectedClientsHistoryService } from '../../services/connected-clients-history/connected-clients-history.service';
import { ConnectedClientsHistorySchema } from '../../schemas/connected-clients-history.schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forFeature([{ name: 'ConnectedClientsHistory', schema: ConnectedClientsHistorySchema }])],
	providers: [ConnectedClientsHistoryService],
	exports: [ConnectedClientsHistoryService],
})
export class ConnectedClientsHistoryModule { }
