import { createParamDecorator } from '@nestjs/common';
import { IAuthUser } from '../interface/user';

/**
 * AuthUser decorator factory
 */
export const AuthUserFn = (_, req: any) => {
  const user = req && req.locals && req.locals.user;
  return user ? user : null;
};

/**
 * AuthUser decorator, returns authenticated user from request body
 *
 * <example-url>/controllers/UserController.html#source</example-url>
 */
export const AuthUser = createParamDecorator(AuthUserFn);
