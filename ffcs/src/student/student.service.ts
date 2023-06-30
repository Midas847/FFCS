/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  Inject,
  Module,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentSignUpDto } from './dto/student-signup.dto';
import { RegisterSlotDto } from './dto/register-slot.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';
import { StudentSignInDto } from './dto/student-signin.dto';
import { DeleteSlotDto } from './dto/delete-slot.dto';
export const roundsOfHashing = 10;

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};
@Injectable()
export class StudentService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheService?: Cache,
  ) {}
  create(createStudentDto: CreateStudentDto) {
    // return this.prisma.rEGISTER_COURSES.create({ data: createStudentDto });
  }

  findAll() {
    return this.prisma.rEGISTER_COURSES.findMany({
      include: {
        course: true,
      },
    });
  }

  findAllCourses() {
    return this.prisma.course.findMany({
      include: {
        registered_slot: true,
      },
      orderBy: {
        course_id: 'asc'
      },
    });
  }

  findSlots() {
    return this.prisma.slot.findMany();
  }

  findOne(id: string): Promise<any> {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  // update(id: number, updateStudentDto: UpdateStudentDto) {
  //   return `This action updates a #${id} student`;
  // }

  async deleteSlot(DeleteSlotDto: DeleteSlotDto): Promise<any> {
    const { course_id, course_type ,student_id} = DeleteSlotDto;
    console.log(course_id, course_type);
    const slots = await this.prisma.rEGISTER_COURSES.deleteMany({
      where: {
        stud_id: student_id,
        course_id,
        course_type,
      },
    });
    await this.prisma.course.update({
      where: {
        course_id_course_type: {
          course_id,
          course_type,
        },
      },
      data: {
        available_slots: {increment: 1},
      },
    })
    return slots;
  }

  async signUp(StudentSignUpDto: StudentSignUpDto): Promise<any> {
    const { id, name, password, role } = StudentSignUpDto;
    const hashedPassword = await bcrypt.hash(password, roundsOfHashing);
    const student = await this.prisma.student.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name,
        role,
        password: hashedPassword,
      },
    });
    return student;
  }

  async signIn(StudentSignInDto: StudentSignInDto): Promise<any> {
    const { id, password } = StudentSignInDto;
    const user = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`No student found for username: ${id}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    // await this.cacheService.set('role', user.role, 3000000);
    return {
      accessToken: this.jwtService.sign({ id: user.id }),
      id: id,
      role: user.role
    };
  }

  async registerSlot(RegisterSlotDto: RegisterSlotDto): Promise<any> {
    const { course_id, faculty_id, slot_ids, course_type, student_id, role } = RegisterSlotDto;

    const duplicate_slot = await this.prisma.rEGISTER_COURSES.findMany({
      where: {
        stud_id: student_id,
        slot_ids: {
          hasSome: slot_ids,
        },
      },
    });
    if (duplicate_slot.length > 0) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Duplicate slots found',
      });
    }
    const course_slot = await this.prisma.rEGISTER_COURSES.upsert({
      where: {
        course_id_course_type_stud_id: {
          course_id,
          course_type,
          stud_id: student_id
        },
      },
      update: {
        stud_id: student_id,
      },
      create: {
        course_id,
        course_type,
        faculty_id,
        slot_ids,
        stud_id: student_id,
      },
    });
    await this.prisma.course.update({
      where: {
        course_id_course_type: {
          course_id,
          course_type,
        },
      },
      data: {
        available_slots: {decrement: 1},
      },
    })
    return course_slot;
  }
}
