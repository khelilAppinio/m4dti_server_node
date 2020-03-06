import { ChatRoom } from "./chatroom.model";

export enum ReportStatus {
	OPEN = 'open',
	CLOSED = 'closed'
}
export interface Report {
	_id: any;
	id: number;
	user_id: string;
	longitude: number;
	latitude: number;
	time: string;
	current_status: ReportStatus;
	events: {id: number}[];
	chatroom: {
		id: number,
		report_id: number,
		messages: string[],
		users: string[]
	};
}