import { Injectable } from '@nestjs/common';

/**
 * App service
 */
@Injectable()
export class AppService {
  /**
   * Returns static "hello world"
   */
  getHello(): string {
    return 'Hello World!';
  }
}
