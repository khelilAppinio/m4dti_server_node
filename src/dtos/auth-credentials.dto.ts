import { IsString, IsNumber, MinLength, MaxLength } from 'class-validator';

export class AuthCredentialsDto {
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	username: string;
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	password: string;
}
