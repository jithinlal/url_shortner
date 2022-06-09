import { IsString } from 'class-validator';

export class UrlDto {
	@IsString()
	public url: string;
}
