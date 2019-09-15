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
  ) { }

  /**
   * @ignore
   */
  async use(req: any, res: any, next: () => void) {

    req.locals = req.locals || {};
    req.locals.user = null;

    const token: string = this.getBearerToken(req);
    if (token) {
      const isTokenValid: boolean = this.verifyToken(token);

      if (isTokenValid) {
        const payload: any = this.getTokenPayload(token);
        req.locals.user = {
          id    : payload.userId,
          email : payload.email,
          roles : payload.roles,
        };
      }
    }

    next();
  }

  /**
   * Decode given jwt token and returns token payload
   */
  private getTokenPayload(token: string): any {
    const decodedToken: any = jwt.decode(token, { complete: true });
    return decodedToken.payload;
  }

  /**
   * verify token
   */
  private verifyToken(token: string): boolean {
    return !!this.jwtService.verify(token);
  }

  /**
   * returns bearer header authorization token from request object
   */
  private getBearerToken(req: any): string {
    try {
      return req.headers.authorization.split(' ')[1];
    } catch (error) {
      return null;
    }
  }
}
