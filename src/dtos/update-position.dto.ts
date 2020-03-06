import { IsString, IsLongitude, IsLatitude } from 'class-validator';

export class UpdatePositionDto {
	@IsLatitude()
	latitude: string;
	@IsLongitude()
	longitude: string;
}
