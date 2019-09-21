import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

/**
 * User service
 */
@Injectable()
export class UserService {

  /**
   * @ignore
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * create user
   */
  async createUser(userData: CreateUserDto ): Promise<User> {
    const user    = new User();
    user.name     = userData.name;
    user.email    = userData.email;
    user.roles    = ['user'];
    user.isActive = true;
    user.password = await this.hashPassword(userData.password);

    try {
      return this.userRepository.save(user);
    } catch (error) {
      // process email duplicate err msg
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error(`user already exists with email ${user.name}`);
      }

      throw error;
    }
  }

  /**
   * get user by id
   */
  getUserById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  /**
   * get user by email
   */
  getUserByEmail(email): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * encrypt password
   */
  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return reject(null);
        }

        bcrypt.hash(password, salt, (err2, hash) => {
          return err2 ? reject(null) : resolve(hash);
        });
      });
    });
  }

  /**
   * compare user password hash
   */
  checkPassword(user: User, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (error, ok) => {
        return (error || !ok) ? resolve(false) : resolve(true);
      });
    });
  }

}
