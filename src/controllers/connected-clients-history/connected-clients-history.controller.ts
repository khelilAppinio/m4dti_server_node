import { Controller, Get, Query, Logger } from '@nestjs/common';
import { ConnectedClientsHistoryService } from 'src/services/connected-clients-history/connected-clients-history.service';

@Controller('connected-clients-history')
export class ConnectedClientsHistoryController {

	constructor(private readonly connectedClientsHistoryService: ConnectedClientsHistoryService) { }

	@Get()
	findAllConnectedClientsHistory(@Query('isConnected') isConnected: boolean) { // ! TODO: query validation
		return this.connectedClientsHistoryService.findAllConnectedClientsHistory(isConnected);
	}
}
