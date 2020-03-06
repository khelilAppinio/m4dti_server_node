import * as mongoose from 'mongoose';

export const ReportSchema = new mongoose.Schema({
	id: Number,
	user_id: String,
	longitude: Number,
	latitude: Number,
	time: String,
	current_status: String,
	events: [{ id: Number }],
	chatroom: {
		id: Number,
		report_id: Number,
		messages: [String],
		users: [String]
	},
});
