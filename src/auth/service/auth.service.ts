import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { User, CreateUserDto, UserService } from '../../user';
import { LoginCredential } from '../dto/login-credential.dto';
// import { JwtService, JwtSignOpts } from './../../utils/service/jwt/jwt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly jwtService: JwtService,
  ) {}

  async registerUser(userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }

  async login(credential: LoginCredential) {
    
    const user = await this.userService.getUserByEmail(credential.email);
    const isMatched = await this.userService.checkPassword(user, credential.password);

    if (!isMatched) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return {
      access_token: this.jwtService.sign({
        sub    : () => user.email,
        email  : user.email,
        roles  : user.roles,
        userId : user.id,
      }),
    };
  }
}
