/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.studentService.findOne(id);
    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any) {
    const { id, password } = user;
    const user1 = await this.validateUser(id, password);
    if (!user1) {
      throw new UnauthorizedException();
    }
    const payload = { name: user.id, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
