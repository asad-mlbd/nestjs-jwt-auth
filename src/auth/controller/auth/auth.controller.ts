import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './../../service/auth.service';
import { CreateUserDto, User } from '../../../user';
import { LoginCredential } from './../../dto/login-credential.dto';
import { TokenDto } from './../../dto/token.dto';

/**
 * Auth controller
 */
@Controller()
export class AuthController {

  /**
   * @ignore
   */
  constructor(
    private readonly service: AuthService,
  ) { }

  /**
   * Create new user
   */
  @Post('register')
  async register(
    @Body() userDto: CreateUserDto,
  ): Promise<User> {
    try {
      return await this.service.registerUser(userDto);
    } catch (error) {
      // process email duplicate err msg
      if (error.code === 'ER_DUP_ENTRY') {
        error.message = `user already exists with email ${userDto.email}`;
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }    
  }

  /**
   * Login users
   */
  @Post('login')
  async login(
    @Body() credential: LoginCredential,
  ): Promise<TokenDto> {
    try {
      return this.service.login(credential);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
