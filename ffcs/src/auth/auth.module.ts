/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { StudentModule } from 'src/student/student.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../student/jwt.strategy';
import { StudentService } from 'src/student/student.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    StudentModule,
    PassportModule,
    PrismaModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, StudentService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
