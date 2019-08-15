import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * App controller
 */

@Controller()
export class AppController {
  /**
   * @ignore
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Health check api
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
