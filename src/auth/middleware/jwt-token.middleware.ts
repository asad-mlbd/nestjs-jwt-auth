import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenMiddleware implements NestMiddleware {

  constructor(
    protected readonly jwtService: JwtService,
  ) {}

  async use(req: any, res: any, next: () => void) {

    req.locals = req.locals || {};
    req.locals.user = null;
    try {
      if (req.headers.authorization) {
        const token: string = req.headers.authorization.split(' ')[1];
        const payload: any  = jwt.decode(token, { complete: true });

        if(this.jwtService.verify(token)) {
          req.locals.user = {
            id    : payload.userId,
            email : payload.email,
            roles : payload.roles,
          };
        }
      }
    } catch (error) {}
    next();
  }
}
