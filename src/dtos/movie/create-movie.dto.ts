import { IsString, IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsDateString()
    releasedAt: string;

    @IsNotEmpty()
    @IsInt()
    duration: number;

    @IsNotEmpty()
    @IsString()
    genre: string;

    @IsNotEmpty()
    @IsString()
    language: string;
}
