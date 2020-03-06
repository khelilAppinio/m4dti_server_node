import { Controller, Post, Get, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { ReportService } from '../../services/report/report.service';
import { GetUser } from '../../decorators/get-user.decorator';
import { User } from 'src/models/users.model';

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
	getAllReportsByUser(@GetUser() user: User) {
		if (user) {
			return this.reportService.getAllReportsByUser(user.provider_user_id);
		} else {
			throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
		}
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
