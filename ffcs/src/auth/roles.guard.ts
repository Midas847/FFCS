/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { Cache } from 'cache-manager';
import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';
// import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheService?: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // const { body } = context.switchToHttp().getRequest();
    if (!requireRoles) {
      return true;
    }
    const body = await this.cacheService.get('role');
    console.log(body);


    return requireRoles.some((role) => body === role);
  }
}
