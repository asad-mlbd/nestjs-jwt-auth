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
      throw new Error('Invalid credentials');
    }

    const isMatched = await this.userService.checkPassword(user, credential.password);

    if (!isMatched) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Inactive user');
    }

    const authToken: TokenDto = this.generateAuthToken(user);
    return Promise.resolve(authToken);
  }

  /**
   * refresh token
   */
  async refreshToken(token: RefreshTokenDto): Promise<TokenDto> {

    let payload: any;

    try {
      payload = this.jwtService.verify(token.refreshToken);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }

    const { userId, type } = payload;

    if (type !== 'refresh') {
      throw new Error('Wrong token type');
    }

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new Error('Invalid user');
    }

    if (!user.isActive) {
      throw new Error('Inactive user');
    }

    const authToken = this.generateAuthToken(user);
    return Promise.resolve(authToken);
  }

  /**
   * Generate Auth Token
   * @param user
   */
  private generateAuthToken(user: User): TokenDto {

    const accessToken = this.jwtService.sign({
      sub: () => user.email,
      type: 'access',
      email: user.email,
      roles: user.roles,
      userId: user.id,
    });

    const refreshToken = this.jwtService.sign({
      sub: () => user.email,
      type: 'refresh',
      userId: user.id,
    });

    return { accessToken, refreshToken };
  }
}
