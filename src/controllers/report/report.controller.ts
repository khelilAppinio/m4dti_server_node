import { Controller, Post, Get, Patch } from '@nestjs/common';
import { ReportService } from '../../services/report/report.service';

@Controller('me/reports')
export class ReportController {
	constructor(private readonly reportService: ReportService) {}
	@Post()
	setReport() {

	}
	@Post(':id/events')
	setEventByReportId() {

	}
	@Get()
	getAllReportsByUser() {
		return this.reportService.getAllReportsByUser();
	}
	@Get(':id/events')
	getAllEventsByReportId() {

	}
	@Patch('position')
	updatePosition() {

	}
	@Patch(':id/close')
	closeReport() {

	}
}
