export interface User {
	name: string;
	password?: string;
	salt?: string;
	status?: 'offline' | 'online';

	role: string;
	provider: string;
	provider_user_id: string;
	profile_picture: string;
}
