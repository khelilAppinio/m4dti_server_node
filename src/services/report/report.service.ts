import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../models/users.model';
import { Model } from 'mongoose';
import { Report } from 'src/models/report.model';

@Injectable()
export class ReportService {
	constructor() {}
	async getAllReportsByUser(providerUserId): Promise<Report[]> {
		return [];
	}
}
