import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from './../user/user.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { SharedModule } from './../shared/shared.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => SharedModule),
  ],
  providers: [
    AuthService,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
