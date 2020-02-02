export interface User {
	username: string;
	password: string;
	salt: string;
	avatar: string;
	status: 'offline' | 'online';
}
