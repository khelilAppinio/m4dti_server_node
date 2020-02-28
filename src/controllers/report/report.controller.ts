import { Controller, Post, Get, Patch } from '@nestjs/common';

@Controller('me/reports')
export class ReportController {
	@Post()
	setReport() {

	}
	@Post(':id/events')
	setEventByReportId() {

	}
	@Get()
	getAllReportsOfUser() {

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
