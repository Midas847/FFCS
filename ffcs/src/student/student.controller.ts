/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentSignInDto } from './dto/student-signin.dto';
import { StudentSignUpDto } from './dto/student-signup.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterSlotDto } from './dto/register-slot.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { DeleteSlotDto } from './dto/delete-slot.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get('/slots')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findSlots() {
    return this.studentService.findSlots();
  }

  @Get('/courses')
  @ApiBearerAuth()
  findCourses() {
    return this.studentService.findAllCourses();
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() StudentSignUpDto: StudentSignUpDto) {
    return this.studentService.signUp(StudentSignUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() StudentSignInDto: StudentSignInDto) {
    return this.studentService.signIn(StudentSignInDto);
  }

  // @Roles(Role.student)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('register/slot')
  registerSlot(@Body() RegisterSlotDto: RegisterSlotDto) {
    return this.studentService.registerSlot(RegisterSlotDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/slot')
  remove(@Body() DeleteSlotDto: DeleteSlotDto) {
    return this.studentService.deleteSlot(DeleteSlotDto);
  }
}
