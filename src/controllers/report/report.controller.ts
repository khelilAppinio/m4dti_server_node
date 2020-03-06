import { Controller, Post, Get, Patch, HttpException, HttpStatus, Body, ValidationPipe, Param } from '@nestjs/common';
import { ReportService } from '../../services/report/report.service';
import { GetUser } from '../../decorators/get-user.decorator';
import { User } from '../../models/users.model';
import { CreateReportDto } from '../../dtos/create-report.dto';
import { UpdatePositionDto } from '../../dtos/update-position.dto';

@Controller('me/reports')
export class ReportController {
	constructor(private readonly reportService: ReportService) { }
	@Post()
	async setReport(@GetUser() user: User, @Body(ValidationPipe) createReportDto: CreateReportDto) {
		const newReport = await this.reportService.createReport(user.provider_user_id, createReportDto);
		return newReport;
	}
	@Post(':id/events')
	setEventByReportId() {
		return [];
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
		return [];
	}
	@Patch('position')
	async updatePosition(@GetUser() user: User,@Body(ValidationPipe) updatePositionDto: UpdatePositionDto) {
		console.log('update');
		
		try {
			const update = await this.reportService.updatePosition(user, updatePositionDto);
			console.log(update);
			
			return update;
		} catch (error) {
			console.log(error);
			
			throw new HttpException('position could not be updated', HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	@Patch('close')
	async closeReport(@GetUser() user: User) {
		
		const updated = await this.reportService.closeReport(user);
		if (updated) {
			return {status: 'closed'};
		} else {
			throw new HttpException('report could not be updated', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
