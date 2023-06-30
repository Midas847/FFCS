/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/role.enum';
export class CreateAdminDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  school: string;

  @ApiProperty()
  name: string;
}
