import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { User, CreateUserDto } from '../../user';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from './../../user/service/user.service';

@Injectable()
export class AuthService {

  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async registerUser(userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
    // const user = new User();
    // user.name = userDto.name;
    // user.email = userDto.email;
    // user.isActive = true;
    // user.roles = ['user'];
    // return this.userRepository.save(user);
  }
}
