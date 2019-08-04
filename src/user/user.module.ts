import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity/user.entity';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
    ]),
  ],
  exports: [
    UserService
  ],
  providers: [
    UserService
  ]
})
export class UserModule {}
