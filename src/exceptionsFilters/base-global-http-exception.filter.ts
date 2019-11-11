import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class BaseGlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // ErrorLoggingService.report({
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    //   details: {...}
    // })

    response
      .status(status)
      .json(exception.getResponse());
  }
}
