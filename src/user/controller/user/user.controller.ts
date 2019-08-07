import { Controller, Get, HttpException, HttpStatus, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './../../service/user.service';
import { IAuthUser, AuthUser, IsUser } from './../../../utils';

@Controller('user')
export class UserController {

  constructor(
    private readonly service: UserService,
  ) {}

  @Get('/me')
  @UseGuards(IsUser)
  @UseInterceptors(ClassSerializerInterceptor)
  async getMe(
    @AuthUser() user: IAuthUser,
  ) {
    try {
      return await this.service.getUserByEmail(user.email);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
