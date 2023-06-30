import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AdminModule, PrismaModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
