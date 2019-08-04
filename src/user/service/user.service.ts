import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(userData: CreateUserDto ) : Promise<User> {
    const user    = new User();
    user.name     = userData.name;
    user.email    = userData.email;
    user.roles    = ['user'];
    user.isActive = true;
    return this.userRepository.save(user);
  }
}
