export interface Message {
	isAdmin: boolean;
	body: string;
	date: string; // TODO: change to switable type.
	username: string; // TODO change to uniqueId
}
