import { ChatRoom } from "./chatroom.model";

export enum ReportStatus {
	OPEN = 'open',
	CLOSED = 'closed'
}
export interface Report {
	_id: any;
	longitude: number;
	latitude: number;
	time: string;
	current_status: ReportStatus;
	events: Event[];
	chatroom: ChatRoom;
}