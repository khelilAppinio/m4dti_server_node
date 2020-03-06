import { IsString, IsLongitude, IsLatitude } from 'class-validator';

export class CreateReportDto {
	@IsString()
	time: string;
	@IsLatitude()
	latitude: string;
	@IsLongitude()
	longitude: string;
}
