import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WinstonModule } from 'nest-winston';
import { loggerConf } from './logger';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { SharedModule } from './shared/shared.module';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { JwtTokenMiddleware, LoggerInterceptor } from './utils';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormConfig from './orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    WinstonModule.forRoot(loggerConf),
    AuthModule,
    UserModule,
    SharedModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
