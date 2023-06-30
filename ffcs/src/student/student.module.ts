/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CacheModule } from '@nestjs/cache-manager';

export const jwtSecret = 'midasmidasmidas';

@Module({
  controllers: [StudentController],
  providers: [StudentService, JwtStrategy],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '15m' },
    }),
  ],
})
export class StudentModule {}
