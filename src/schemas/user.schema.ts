import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
	name: {type: String, unique: true},
	password: String,
	salt: String,
	status: String,
	
	role: String,
	provider: String,
	provider_user_id: String,
	profile_picture: String,
});
