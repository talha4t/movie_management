import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        const refreshToken = this.extractTokenFromHeader(request);
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is missing');
        }

        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            request.user = payload;
        } catch (error) {
            throw new UnauthorizedException(
                error,
                'Invalid or expired refresh token',
            );
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | null {
        const authHeader = request.headers['authorization'];
        if (!authHeader) return null;

        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' && token ? token : null;
    }
}
