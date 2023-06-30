import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';

enum CourseType {
  THEORY = 'THEORY',
  LAB = 'LAB',
}
export class RegisterSlotDto {
  @ApiProperty()
  course_id: string;

  @ApiProperty()
  course_type: CourseType;

  @ApiProperty()
  faculty_id: string;

  @ApiProperty()
  role: Role[];

  @ApiProperty()
  student_id: string;

  @ApiProperty()
  slot_ids: string[];
}
