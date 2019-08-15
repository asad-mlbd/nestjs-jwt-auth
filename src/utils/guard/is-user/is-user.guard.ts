import { CanActivate, ExecutionContext, Injectable, HttpStatus, HttpException } from '@nestjs/common';

/**
 * Auth guard for user
 */
@Injectable()
export class IsUser implements CanActivate {

  /**
   * @ignore
   */
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const user = this.getContextUser(context);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return Promise.resolve(true);
  }

  /**
   * get context user from req
   */
  protected getContextUser(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.locals.user;
  }
}
