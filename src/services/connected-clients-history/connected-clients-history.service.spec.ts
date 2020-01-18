import { Test, TestingModule } from '@nestjs/testing';
import { ConnectedClientsHistoryService } from './connected-clients-history.service';

describe('ConnectedClientsHistoryService', () => {
	let service: ConnectedClientsHistoryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ConnectedClientsHistoryService],
		}).compile();

		service = module.get<ConnectedClientsHistoryService>(ConnectedClientsHistoryService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
