import {
  Inject,
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';

import { Logger } from 'winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServerResponse, IncomingMessage } from 'http';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const http = context.switchToHttp();

    const request: IncomingMessage = http.getRequest();
    const response: ServerResponse = http.getResponse();
    return next
      .handle()
      .pipe(
        tap(() => {
          const end = Date.now();
          const metadata = {
            'time': `${end - start} ms`,
            'timestamp': start.toString(),
            'host' : request.headers.host,
            'origin': request.headers.origin,
            'referer': request.headers.referer,
            'user-agent' : request.headers['user-agent'],
          };
          this.logger.info(`req: ${request.method} ${request.url} res: ${response.statusCode}`, { metadata });
        }),
      );
  }
}
