import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto, UpdateMovieDto } from 'src/dtos/movie';
import { CreateRatingDto, CreateReportDto } from 'src/dtos/rating-report';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async createMovie(userId: string, createMovieDto: CreateMovieDto) {
        try {
            return await this.prisma.movie.create({
                data: {
                    ...createMovieDto,
                    releasedAt: new Date(createMovieDto.releasedAt),
                    createdBy: { connect: { id: userId } },
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async updateMovie(
        userId: string,
        movieId: string,
        updateMovieDto: UpdateMovieDto,
    ) {
        try {
            const movie = await this.prisma.movie.findUnique({
                where: { id: movieId },
            });

            if (!movie) {
                throw new NotFoundException('Movie not found');
            }

            if (movie.userId !== userId) {
                throw new ForbiddenException(
                    'You are not allowed to update this movie',
                );
            }

            return await this.prisma.movie.update({
                where: { id: movieId },
                data: {
                    ...updateMovieDto,
                    releasedAt: new Date(updateMovieDto.releasedAt),
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getMovieById(movieId: string) {
        try {
            const movie = await this.prisma.movie.findUnique({
                where: { id: movieId },
                include: {
                    createdBy: { select: { username: true } },
                    ratings: { select: { value: true } },
                },
            });

            if (!movie) {
                throw new NotFoundException('Movie not found');
            }

            return movie;
        } catch (error) {
            throw error;
        }
    }

    async getAllMovies() {
        try {
            return await this.prisma.movie.findMany({
                select: {
                    id: true,
                    title: true,
                    genre: true,
                    avgRating: true,
                    totalRating: true,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async createRating(
        userId: string,
        movieId: string,
        createRatingDto: CreateRatingDto,
    ) {
        try {
            return await this.prisma.$transaction(async tx => {
                const rating = await tx.rating.create({
                    data: {
                        value: createRatingDto.value,
                        userId,
                        movieId,
                    },
                });

                await this.updateMovieAvgRating(movieId);

                return await tx.rating.findUnique({
                    where: { id: rating.id },
                    include: {
                        movie: {
                            select: {
                                title: true,
                                avgRating: true,
                                totalRating: true,
                            },
                        },
                    },
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async updateRating(
        userId: string,
        movieId: string,
        updateRatingDto: CreateRatingDto,
    ) {
        try {
            const existingRating = await this.prisma.rating.findUnique({
                where: { userId_movieId: { userId, movieId } },
            });

            if (!existingRating) {
                throw new NotFoundException('Rating not found');
            }

            return await this.prisma.$transaction(async tx => {
                const updatedRating = await tx.rating.update({
                    where: { userId_movieId: { userId, movieId } },
                    data: { value: updateRatingDto.value },
                });

                await this.updateMovieAvgRating(movieId);

                return await tx.rating.findUnique({
                    where: { id: updatedRating.id },
                    include: {
                        movie: {
                            select: {
                                title: true,
                                avgRating: true,
                                totalRating: true,
                            },
                        },
                    },
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async reportMovie(
        userId: string,
        movieId: string,
        createReportDto: CreateReportDto,
    ) {
        try {
            const { reason } = createReportDto;

            const report = await this.prisma.report.create({
                data: {
                    reason,
                    userId,
                    movieId,
                },
            });

            return report;
        } catch (error) {
            throw error;
        }
    }

    private async updateMovieAvgRating(movieId: string) {
        try {
            await this.prisma.$transaction(async tx => {
                const ratings = await tx.rating.findMany({
                    where: { movieId },
                });

                const totalRatings = ratings.length;
                const sumOfRatings = ratings.reduce(
                    (sum, rating) => sum + rating.value,
                    0,
                );

                const avgRating =
                    totalRatings > 0 ? sumOfRatings / totalRatings : 0;

                await tx.movie.update({
                    where: { id: movieId },
                    data: {
                        avgRating,
                        totalRating: totalRatings,
                    },
                });
            });
        } catch (error) {
            throw error;
        }
    }
}
