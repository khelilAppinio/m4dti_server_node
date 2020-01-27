import { Test, TestingModule } from '@nestjs/testing';
import { AudioUploadController } from './audio-upload.controller';

describe('AudioUpload Controller', () => {
  let controller: AudioUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AudioUploadController],
    }).compile();

    controller = module.get<AudioUploadController>(AudioUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
