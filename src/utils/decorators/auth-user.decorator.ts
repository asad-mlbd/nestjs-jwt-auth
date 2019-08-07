import { createParamDecorator } from '@nestjs/common';
import { IAuthUser } from '../interface/user';

export const AuthUser = createParamDecorator((data, req): IAuthUser => {
  return req.locals.user;
});
