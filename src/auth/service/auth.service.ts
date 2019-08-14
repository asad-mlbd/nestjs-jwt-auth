import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { User, CreateUserDto, UserService } from '../../user';
import { LoginCredential } from '../dto/login-credential.dto';
import { TokenDto } from './../dto/token.dto';
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
  ) {}

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
    const isMatched = await this.userService.checkPassword(user, credential.password);

    if (!isMatched) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return new Promise ((resolve, _) => {
      
      resolve({
        access_token: this.jwtService.sign({
          sub    : () => user.email,
          email  : user.email,
          roles  : user.roles,
          userId : user.id,
        }),
      });
    });
  }
}
