/* eslint-disable prettier/prettier */
import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.message;
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
