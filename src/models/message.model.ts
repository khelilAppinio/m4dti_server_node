export interface Message {
	isAdmin: boolean;
	body: string;
	date: number; // TODO: change to switable type.
	name: string; // TODO change to uniqueId
	mediaUrl: string;
	unread: boolean;
}
