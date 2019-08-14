import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

/**
 * JWT token middle wire
 * 
 * decode & verify authorization bearer token and 
 * inject as req user
 */
@Injectable()
export class JwtTokenMiddleware implements NestMiddleware {

  /**
   * @ignore
   */
  constructor(
    protected readonly jwtService: JwtService,
  ) {}

  /**
   * @ignore 
   */
  async use(req: any, res: any, next: () => void) {

    req.locals = req.locals || {};
    req.locals.user = null;

    try {
      const token: string = req.headers.authorization.split(' ')[1];
      const decodedToken: any = jwt.decode(token, { complete: true });
      const { payload } = decodedToken;

      if (this.jwtService.verify(token)) {
        req.locals.user = {
          id    : payload.userId,
          email : payload.email,
          roles : payload.roles,
        };
      }
    } catch (error) { }
    
    next();
  }
}
