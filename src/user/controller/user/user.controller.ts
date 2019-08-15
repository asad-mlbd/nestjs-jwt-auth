import { Controller, Get, HttpException, HttpStatus, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './../../service/user.service';
import { User } from './../../entity/user.entity';
import { IAuthUser, AuthUser, IsUser } from './../../../utils';
import { ApiBearerAuth } from '@nestjs/swagger';

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
  @UseGuards(IsUser)
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
}
