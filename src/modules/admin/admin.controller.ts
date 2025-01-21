import {
    Controller,
    Get,
    Param,
    Delete,
    UseGuards,
    Patch,
    Body,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/guards';
import { Roles } from 'src/decorators';
import { Role } from '@prisma/client';
import { UpdateReportStatusDto } from 'src/dtos/status';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard)
@Controller('api/v1/admin/reports')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    async getAllReportedMovies() {
        return await this.adminService.getAllReportedMovies();
    }

    @Get(':id')
    async getReportedMovieById(@Param('id') reportId: string) {
        return await this.adminService.getReportedMovieById(reportId);
    }

    @Patch('status/:id')
    async updateReportStatus(
        @Param('id') reportId: string,
        @Body() updateStatusDto: UpdateReportStatusDto,
    ) {
        return await this.adminService.updateReportStatus(
            reportId,
            updateStatusDto,
        );
    }

    @Delete(':id')
    async deleteReportedMovie(@Param('id') reportId: string) {
        return await this.adminService.deleteReportedMovie(reportId);
    }
}
