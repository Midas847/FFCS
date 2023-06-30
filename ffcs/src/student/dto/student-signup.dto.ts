import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
export class StudentSignUpDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role;
}
