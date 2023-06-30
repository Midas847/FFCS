import { ApiProperty } from '@nestjs/swagger';

enum CourseType {
  THEORY = 'THEORY',
  LAB = 'LAB',
}
export class DeleteSlotDto {
  @ApiProperty()
  course_id: string;

  @ApiProperty()
  course_type: CourseType;

  @ApiProperty()
  student_id: string;
}
