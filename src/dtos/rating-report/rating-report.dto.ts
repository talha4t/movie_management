import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateRatingDto {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    value: number;
}

export class UpdateRatingDto {
    @IsNotEmpty()
    @IsNumber()
    value: number;
}

export class CreateReportDto {
    @IsNotEmpty()
    @IsString()
    reason: string;
}
