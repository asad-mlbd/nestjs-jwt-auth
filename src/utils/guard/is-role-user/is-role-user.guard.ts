import { ExecutionContext, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserRole } from './../../interface/user';
import { IsUser } from '../is-user/is-user.guard';

@Injectable()
export abstract class IsRoleUser extends IsUser {

  protected abstract readonly role: UserRole;

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const user = this.getContextUser(context);

    if(!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const hasRole = user && user.role === this.role;
    return Promise.resolve(hasRole);
  }
}
