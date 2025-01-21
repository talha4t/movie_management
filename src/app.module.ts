import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        AuthModule,
        PrismaModule,
        UserModule,
        AdminModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
