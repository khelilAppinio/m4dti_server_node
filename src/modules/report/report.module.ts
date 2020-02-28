import { Module } from '@nestjs/common';
import { ReportController } from '../../controllers/report/report.controller';
import { ReportService } from '../../services/report/report.service';

@Module({
	controllers: [ReportController],
	providers: [ReportService]
})
export class ReportModule {}
