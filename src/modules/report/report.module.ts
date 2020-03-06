import { Module } from '@nestjs/common';
import { ReportController } from '../../controllers/report/report.controller';
import { ReportService } from '../../services/report/report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSchema } from '../../schemas/report.schema';
import { UserSchema } from '../../schemas/user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }]),
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
	],
	controllers: [ReportController],
	providers: [ReportService]
})
export class ReportModule { }
