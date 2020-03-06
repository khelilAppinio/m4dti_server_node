import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from '../../models/report.model';
import { User } from '../../models/users.model';
import { CreateReportDto } from 'src/dtos/create-report.dto';

@Injectable()
export class ReportService {
	
	
	constructor(
		@InjectModel('Report') private readonly reportModel: Model<Report>,
		@InjectModel('User') private readonly userModel: Model<User>,
	) {}
	async getAllReportsByUser(providerUserId): Promise<Report[]> {
		return [];
	}

	async createReport(providerId: string, createReportDto: CreateReportDto): Promise<Report> {
		const newReport = new this.reportModel({
			id: Math.floor(Math.random() * Math.floor(999999999)),
			user_id: providerId,
			current_status: 'open',
			events: [],
			chatroom: {
				id: 37,
				report_id: 37,
				messages: [],
				users: []
			},
			...createReportDto
		});

		try {
			await newReport.save();
			return newReport;
		} catch (error) {
			throw new HttpException('could not save new report in the database', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	async closeReport(user: User) {
		return await this.reportModel.updateOne({user_id: user.provider_user_id}, {current_status: 'closed'});
	}
}
