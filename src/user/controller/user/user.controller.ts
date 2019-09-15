import {
  Get,
  UseGuards,
  Controller,
  HttpStatus,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { User } from './../../entity/user.entity';
import { UserService } from './../../service/user.service';
import { IAuthUser, AuthUser, RolesGuard, Roles } from './../../../utils';

/**
 * User controller
 */
@Controller('user')
export class UserController {

  /**
   * @ignore
   */
  constructor(
    private readonly service: UserService,
  ) {}

  /**
   * logged in user's profile
   */
  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('user', 'admin')
  @UseInterceptors(ClassSerializerInterceptor)
  async getMe(
    @AuthUser() user: IAuthUser,
  ): Promise<User> {
    try {
      return await this.service.getUserByEmail(user.email);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get all user list
   */
  @Get()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUser(): Promise<User[]> {
    try {
      return await this.service.getAllUsers();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
