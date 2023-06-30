import { ApiProperty } from '@nestjs/swagger';
export class StudentSignInDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  password: string;
}
