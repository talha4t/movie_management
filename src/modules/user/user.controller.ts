import {
    Controller,
    Post,
    Body,
    Put,
    Param,
    Get,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards';
import { CreateMovieDto, UpdateMovieDto } from 'src/dtos/movie';
import { GetCurrentUserId } from 'src/decorators';
import { CreateRatingDto, CreateReportDto } from 'src/dtos/rating-report';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/movies')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async createMovie(
        @GetCurrentUserId() userId: string,
        @Body() createMovieDto: CreateMovieDto,
    ) {
        return await this.userService.createMovie(userId, createMovieDto);
    }

    @Put(':id')
    async updateMovie(
        @GetCurrentUserId() userId: string,
        @Param('id') movieId: string,
        @Body() updateMovieDto: UpdateMovieDto,
    ) {
        return await this.userService.updateMovie(
            userId,
            movieId,
            updateMovieDto,
        );
    }

    @Get(':id')
    async getMovieById(@Param('id') movieId: string) {
        return await this.userService.getMovieById(movieId);
    }

    @Get()
    async getAllMovies() {
        return await this.userService.getAllMovies();
    }

    @Post('rating/:movieId')
    async createRating(
        @GetCurrentUserId() userId: string,
        @Param('movieId') movieId: string,
        @Body() createRatingDto: CreateRatingDto,
    ) {
        return await this.userService.createRating(
            userId,
            movieId,
            createRatingDto,
        );
    }

    @Put('rating/:movieId')
    async updateRating(
        @GetCurrentUserId() userId: string,
        @Param('movieId') movieId: string,
        @Body() updateRatingDto: CreateRatingDto,
    ) {
        return await this.userService.updateRating(
            userId,
            movieId,
            updateRatingDto,
        );
    }

    @Post('report/:movieId')
    async reportMovie(
        @GetCurrentUserId() userId: string,
        @Param('movieId') movieId: string,
        @Body() createReportDto: CreateReportDto,
    ) {
        return await this.userService.reportMovie(
            userId,
            movieId,
            createReportDto,
        );
    }
}
