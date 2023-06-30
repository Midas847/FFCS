/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private studentService: StudentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'midasmidasmidas',
    });
  }

  async validate(payload: { id: string }) {
    const user = await this.studentService.findOne(payload.id);
    // console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
