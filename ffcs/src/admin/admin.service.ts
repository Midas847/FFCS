/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/auth/role.enum';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}
  async createFaculty(createAdminDto: CreateAdminDto): Promise<any> {
    // return 'This action will create a new faculty';
    const { id, name, school } = createAdminDto;
    const fac = await this.prismaService.faculty.findUnique({ where: { id } });
    if (fac)
      throw new ForbiddenException({
        message: `Faculty with id: ${id} already exists`,
      });

    const faculty = await this.prismaService.faculty.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name,
        school,
        role: Role.faculty,
      },
    });
    return faculty;
  }

  async findAllStudents(): Promise<any> {
    const students = await this.prismaService.student.findMany();
    return students;
  }

  async findAllFaculties(): Promise<any> {
    const faculties = await this.prismaService.faculty.findMany();
    return faculties;
  }

  async findOneFaculty(id: string): Promise<any> {
    try {
      const faculty = await this.prismaService.faculty.findUnique({
        where: {
          id,
        },
      });
      if (!faculty) {
        throw new BadRequestException({
          message: `Faculty with id: ${id} not found`,
        });
      }
      return faculty;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateFaculty(
    id: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise<any> {
    try {
      const faculty = await this.prismaService.faculty.update({
        where: { id },
        data: updateAdminDto,
      });
      return faculty;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async removeFaculty(id: string): Promise<any> {
    try {
      const deletedFaculty = await this.prismaService.faculty.delete({
        where: { id },
      });
      return deletedFaculty;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
