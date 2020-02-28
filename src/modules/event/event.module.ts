import { Module } from '@nestjs/common';
import { EventController } from '../../controllers/event/event.controller';
import { EventService } from '../../services/event/event.service';

@Module({
	controllers: [EventController],
	providers: [EventService]
})
export class EventModule {}
