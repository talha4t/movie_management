import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateReportStatusDto } from 'src/dtos/status';
import { ReportStatus } from '@prisma/client';

@Injectable()
export class AdminService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllReportedMovies() {
        try {
            return await this.prisma.report.findMany({
                select: {
                    id: true,
                    reason: true,
                    status: true,
                    createdAt: true,
                    movie: {
                        select: {
                            id: true,
                            title: true,
                            avgRating: true,
                            totalRating: true,
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                },
            });
        } catch (error) {
            throw new Error(
                `Failed to get all reported movies: ${error.message}`,
            );
        }
    }

    async getReportedMovieById(reportId: string) {
        try {
            const report = await this.prisma.report.findUnique({
                where: { id: reportId },
                include: {
                    movie: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                },
            });

            if (!report) {
                throw new NotFoundException('Reported movie not found');
            }

            return report;
        } catch (error) {
            throw new Error(
                `Failed to get reported movie by ID: ${error.message}`,
            );
        }
    }

    async updateReportStatus(
        reportId: string,
        updateStatusDto: UpdateReportStatusDto,
    ) {
        try {
            const report = await this.prisma.report.findUnique({
                where: { id: reportId },
            });

            if (!report) {
                throw new NotFoundException('Reported movie not found');
            }

            const updatedReport = await this.prisma.report.update({
                where: { id: reportId },
                data: {
                    status: updateStatusDto.status as ReportStatus,
                },
            });

            return updatedReport;
        } catch (error) {
            throw new Error(`Failed to update report status: ${error.message}`);
        }
    }

    async deleteReportedMovie(reportId: string) {
        try {
            const report = await this.prisma.report.findUnique({
                where: { id: reportId },
            });

            if (!report) {
                throw new NotFoundException('Reported movie not found');
            }

            await this.prisma.movie.delete({
                where: { id: report.movieId },
            });

            return {
                message: 'Movie and associated report deleted successfully',
            };
        } catch (error) {
            throw new Error(
                `Failed to delete reported movie: ${error.message}`,
            );
        }
    }
}
