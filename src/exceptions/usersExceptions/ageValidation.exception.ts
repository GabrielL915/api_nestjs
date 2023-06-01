/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';

export class ageValidationException extends HttpException {
  constructor() {
    super('idade tem que ser menor que 100', HttpStatus.BAD_REQUEST);
  }
}
