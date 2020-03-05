import * as mongoose from 'mongoose';

export const ReportSchema = new mongoose.Schema({
	longitude: Number,
	latitude: Number,
	time: String,
	current_status: ReportStatus,
	events: Event[];
	chatroom: ChatRoom;
});
