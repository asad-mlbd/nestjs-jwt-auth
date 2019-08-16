import { AuthUser } from './auth-user.decorator';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { AuthUserFn } from './auth-user.decorator';

describe('@AuthUser', () => {

  it('should return request user', () => {
    const mockReq = {
      locals: {
        user : {
          email: 'hello@example.com',
        },
      },
    };

    expect(AuthUserFn(null, mockReq)).toBe(mockReq.locals.user);
  });

  it('should return null when request has no user', () => {
    expect(AuthUserFn(null, {})).toBe(null);
  });
});
