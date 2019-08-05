import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './../user/user.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { UtilsModule } from './../utils/utils.module';


@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => UtilsModule),

  ],
  providers: [
    AuthService,
  ],
  controllers: [
    AuthController
  ],
})
export class AuthModule {}
