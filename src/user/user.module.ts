import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { UserController } from './controller/user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
    ]),
  ],
  exports: [
    UserService,
  ],
  providers: [
    UserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
