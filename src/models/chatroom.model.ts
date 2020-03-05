import { Message } from "./message.model";
import { User } from "./users.model";

export interface ChatRoom {
	_id?: any;
	report_id: any;
	messages: Message[];
	users: User[];
} 