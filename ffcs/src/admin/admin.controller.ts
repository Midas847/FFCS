/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('faculty/register')
  @Roles(Role.admin)
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createFaculty(createAdminDto);
  }

  @Get('student')
  findAllStudents() {
    return this.adminService.findAllStudents();
  }

  @Get('faculty')
  findAllFaculties() {
    return this.adminService.findAllFaculties();
  }

  @Get('faculty/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOneFaculty(id);
  }

  @Patch('faculty/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateFaculty(id, updateAdminDto);
  }

  @Delete('faculty/:id')
  remove(@Param('id') id: string) {
    return this.adminService.removeFaculty(id);
  }
}
