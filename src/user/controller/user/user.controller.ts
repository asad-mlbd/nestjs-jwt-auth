import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './../../service/user.service';
import { IAuthUser, AuthUser } from './../../../utils';

@Controller('user')
export class UserController {

  constructor(
    private readonly service: UserService,
  ) {}

  @Get('/me')
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
