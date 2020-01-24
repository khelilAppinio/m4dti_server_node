import { Test, TestingModule } from '@nestjs/testing';
import { ConnectedClientsHistoryController } from './connected-clients-history.controller';

describe('ConnectedClientsHistory Controller', () => {
  let controller: ConnectedClientsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectedClientsHistoryController],
    }).compile();

    controller = module.get<ConnectedClientsHistoryController>(ConnectedClientsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
