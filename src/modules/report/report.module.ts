import { Module } from '@nestjs/common';
import { ReportController } from '../../controllers/report/report.controller';
import { ReportService } from '../../services/report/report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSchema } from '../../schemas/report.schema';
import { UserSchema } from '../../schemas/user.schema';
import { ImageUploadService } from 'src/services/image-upload/image-upload.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Report', schema: ReportSchema }]),
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
	],
	controllers: [ReportController],
	providers: [ReportService, ImageUploadService]
})
export class ReportModule { }
