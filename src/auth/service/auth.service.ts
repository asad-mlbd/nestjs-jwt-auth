import { Injectable, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { User, CreateUserDto } from '../../user';

import { UserService } from './../../user/service/user.service';
import { LoginCredential } from '../dto/login-credential.dto';

@Injectable()
export class AuthService {

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
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

    return "ok"
  }
}
