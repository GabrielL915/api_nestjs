/* eslint-disable prettier/prettier */
import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExceptionFilter } from '@nestjs/common/interfaces/exceptions';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400;
    const message = 'Bad Request';
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
