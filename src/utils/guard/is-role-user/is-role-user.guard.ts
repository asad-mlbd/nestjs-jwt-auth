// import { ExecutionContext, Injectable, HttpStatus, HttpException } from '@nestjs/common';
// import { UserRole } from './../../interface/user';
// import { IsUser } from '../is-user/is-user.guard';

// /**
//  * Abstact class IsRoleUser class to create role based guards
//  */
// @Injectable()
// export abstract class IsRoleUser extends IsUser {

//   /**
//    * user exptected role
//    */
//   protected abstract readonly role: UserRole;

//   /**
//    * @ignore
//    */
//   canActivate(
//     context: ExecutionContext,
//   ): Promise<boolean> {

//     const user = this.getContextUser(context);

//     if (!user) {
//       throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
//     }

//     const hasRole = user && user.role === this.role;
//     return Promise.resolve(hasRole);
//   }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    console.log('roles found', roles);

    const request = context.switchToHttp().getRequest();
    const user = request.locals.user;
    console.log('user found', user);
    const hasRole = () => user.roles.find((role) => roles.includes(role));
    return user && user.roles && hasRole();
  }
}