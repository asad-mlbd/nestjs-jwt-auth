import { CanActivate, ExecutionContext, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { IAuthUser, UserRole } from '../../interface/user';
import { Observable } from 'rxjs';
import { Http2ServerRequest } from 'http2';

@Injectable()
export class IsUser implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const user = this.getContextUser(context);
    
    if(!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return Promise.resolve(true);
  }

  protected getContextUser(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.locals.user;
  }
}
