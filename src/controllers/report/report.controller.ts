import { Controller, Post, Get, Patch, HttpException, HttpStatus, Body, ValidationPipe, Param, Delete } from '@nestjs/common';
import { ReportService } from '../../services/report/report.service';
import { GetUser } from '../../decorators/get-user.decorator';
import { User } from '../../models/users.model';
import { CreateReportDto } from '../../dtos/create-report.dto';
import { UpdatePositionDto } from '../../dtos/update-position.dto';
import { CreateEventDto } from '../../dtos/create-event.dto';
import { UpdateEventDto } from '../../dtos/update-event.dto';

@Controller('me')
export class ReportController {
	constructor(private readonly reportService: ReportService) { }
	@Post('reports')
	async setReport(@GetUser() user: User, @Body(ValidationPipe) createReportDto: CreateReportDto) {
		const newReport = await this.reportService.createReport(user.provider_user_id, createReportDto);
		return newReport;
	}
	@Post('reports/:id/events')
	async setEventByReportId(@Param('id') id: number, @Body(ValidationPipe) createEventDto: CreateEventDto) {
		try {
			const report = await this.reportService.createEvent(id, createEventDto);
			return report;
		} catch (error) {
			throw new HttpException('could not create new event', HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	@Get('reports')
	getAllReportsByUser(@GetUser() user: User) {
		if (user) {
			return this.reportService.getAllReportsByUser(user.provider_user_id);
		} else {
			throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@Get('reports/:id/events')
	getAllEventsByReportId(@GetUser() user: User, @Param('id') reportId: number) {
		
		if(user) {
			return this.reportService.getAllEventsByReportId(reportId, user.provider_user_id);
		} else {
			throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}
	@Patch('reports/position')
	async updatePosition(@GetUser() user: User, @Body(ValidationPipe) updatePositionDto: UpdatePositionDto) {
		try {
			const update = await this.reportService.updatePosition(user, updatePositionDto);

			return update;
		} catch (error) {
			throw new HttpException('position could not be updated', HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	@Patch('reports/close')
	async closeReport(@GetUser() user: User) {

		const updated = await this.reportService.closeReport(user);
		if (updated) {
			return { status: 'closed' };
		} else {
			throw new HttpException('report could not be updated', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@Delete('events/:id')
	async deleteEventByUseId(@GetUser() user: User, @Param('id') eventId: string) {
		
		if (user) {
			return this.reportService.deleteEventByUseId(user.provider_user_id, eventId);
		} else {
			throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@Patch('events/:id')
	async updateEventById(@GetUser() user: User, @Param('id') eventId: string, @Body(ValidationPipe) updateEventDto: UpdateEventDto) {
		if (user) {
			return this.reportService.updateEventById(user.provider_user_id, eventId, updateEventDto);
		} else {
			throw new HttpException('event could not be updated', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@Delete('delete')
	async deleteAllReportsByUserId(@GetUser() user: User) {
		if (user) {
			return await this.reportService.deleteAllReportsByUserId(user.provider_user_id);
		} else {
			throw new HttpException('event could not be updated', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
