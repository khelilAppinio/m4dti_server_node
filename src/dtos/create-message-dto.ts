import { IsString, IsBoolean, IsNumber } from 'class-validator';
export class CreateMessageDto {
	@IsBoolean()
	readonly isAdmin: boolean;
	@IsString()
	readonly body: string;
	@IsNumber()
	readonly date: number; // TODO: change to switable type.
	@IsString()
	readonly username: string; // TODO change to uniqueId
	@IsString()
	readonly mediaUrl: string;
}
