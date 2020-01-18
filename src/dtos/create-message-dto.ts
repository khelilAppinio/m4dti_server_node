export class CreateMessageDto {
	readonly isAdmin: boolean;
	readonly body: string;
	readonly date: string; // TODO: change to switable type.
	readonly username: string; // TODO change to uniqueId
}
