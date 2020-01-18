import { IsString, IsBoolean } from 'class-validator';
export class CreateMessageDto {
	@IsBoolean()
	readonly isAdmin: boolean;
	@IsString()
	readonly body: string;
	@IsString()
	readonly date: string; // TODO: change to switable type.
	@IsString()
	readonly username: string; // TODO change to uniqueId
}
