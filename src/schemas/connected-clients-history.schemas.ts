import * as mongoose from 'mongoose';

export const ConnectedClientsHistorySchema = new mongoose.Schema({
	name: String,
	isConnected: Boolean,
	socketID: String,
});
