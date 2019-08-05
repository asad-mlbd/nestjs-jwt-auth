import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './../../service/auth.service';
import { CreateUserDto } from '../../../user';
import { LoginCredential } from './../../dto/login-credential.dto';

@Controller()
export class AuthController {

  constructor(
    private readonly service: AuthService,
  ) { }

  @Post('register')
  async register(
    @Body() userDto: CreateUserDto,
  ) {
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

  @Post('login')
  async login(
    @Body() credential: LoginCredential,
  ) {
    try {
      return await this.service.login(credential);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
