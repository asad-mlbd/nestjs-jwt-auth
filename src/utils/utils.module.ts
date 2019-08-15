import { Module, forwardRef } from '@nestjs/common';
import { SharedModule } from './../shared/shared.module';

@Module({
  imports : [
    forwardRef(() => SharedModule),
  ],
})
export class UtilsModule {}
