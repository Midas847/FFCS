/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { CourseType } from 'prisma/seed';

export class CreateStudentDto {
  @ApiProperty()
  course_id: string;

  @ApiProperty()
  course_type: string;

  register: string;

  @ApiProperty()
  faculty_id: string;

  @ApiProperty()
  slot_ids: string[];
}
