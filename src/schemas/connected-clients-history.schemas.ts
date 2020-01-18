import * as mongoose from 'mongoose';

export const ConnectedClientsHistorySchema = new mongoose.Schema({
	username: String,
	isConnected: Boolean,
	socketID: String,
});
