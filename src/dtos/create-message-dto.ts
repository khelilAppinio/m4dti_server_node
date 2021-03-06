import { IsString, IsBoolean, IsNumber } from 'class-validator';
export class CreateMessageDto {
	@IsBoolean()
	readonly isAdmin: boolean;
	@IsString()
	readonly body: string;
	@IsNumber()
	readonly date: number; // TODO: change to switable type.
	@IsString()
	readonly name: string; // TODO change to uniqueId
	@IsString()
	readonly mediaUrl: string;
	@IsBoolean()
	readonly unread: boolean;
}
