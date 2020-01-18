import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
	isAdmin: Boolean,
	body: String,
	date: Number, // TODO: change to switable type.
	username: String, // TODO change to uniqueId
});
