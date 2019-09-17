import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { User, CreateUserDto, UserService } from '../../user';
import { LoginCredential } from '../dto/login-credential.dto';
import { TokenDto } from './../dto/token.dto';
import { RefreshTokenDto } from './../dto/refresh-token.dto';

import { JwtService } from '@nestjs/jwt';

/**
 * Auth service
 */
@Injectable()
export class AuthService {

  /**
   * @ignore
   */
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly jwtService: JwtService,
  ) { }

  /**
   * register user
   */
  async registerUser(userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }

  /**
   * login user
   */
  async login(credential: LoginCredential): Promise<TokenDto> {

    const user = await this.userService.getUserByEmail(credential.email);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatched = await this.userService.checkPassword(user, credential.password);

    if (!isMatched) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (!user.isActive) {
      throw new HttpException('Inactive user', HttpStatus.UNAUTHORIZED);
    }

    return new Promise((resolve, _) => {

      resolve({
        accessToken: this.jwtService.sign({
          sub: () => user.email,
          email: user.email,
          roles: user.roles,
          userId: user.id,
        }),
      });
    });
  }

  /**
   * refresh token
   */
  async refreshToken(token: RefreshTokenDto): Promise<TokenDto> {

    const decodedToken: any = this.jwtService.decode(token.refreshToken, { complete: true });
    const payload: User = decodedToken.payload;
    const user = await this.userService.getUserByEmail(payload.email);

    // todo replace using a function call
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // todo replace using a function call
    if (!user.isActive) {
      throw new HttpException('Inactive user', HttpStatus.UNAUTHORIZED);
    }
    return new Promise((resolve, _) => {
      resolve({
        accessToken: this.jwtService.sign({
          sub: () => user.email,
          email: user.email,
          roles: user.roles,
          userId: user.id,
        }),
      });
    });
  }
}
