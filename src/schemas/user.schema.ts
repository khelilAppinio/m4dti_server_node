import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	password: String,
	salt: String,
	avatar: String,
	status: String,
});
