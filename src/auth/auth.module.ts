import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './../user/user.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth/auth.controller';


@Module({
  imports: [
    forwardRef(() => UserModule),
  ],
  providers: [
    AuthService,
  ],
  controllers: [
    AuthController
  ],
})
export class AuthModule {}
