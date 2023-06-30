/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { StudentService } from './student/student.service';
import { CacheModule } from '@nestjs/cache-manager';
import { AdminModule } from './admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [
    PrismaModule,
    StudentModule,
    AuthModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '3600s' },
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    StudentService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
