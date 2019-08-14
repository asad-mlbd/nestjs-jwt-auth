import { createParamDecorator } from '@nestjs/common';
import { IAuthUser } from '../interface/user';

/**
 * AuthUser decorator, returns authenticated user from request body
 * 
 * <example-url>/controllers/UserController.html#source</example-url>
 */
export const AuthUser = createParamDecorator((data, req): IAuthUser => {
  return req.locals.user;
});
