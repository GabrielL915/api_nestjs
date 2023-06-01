import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ageValidationException } from '../exceptions/usersExceptions/ageValidation.exception';
import { HttpExceptionFilter } from '../exceptions/exceptionfilters';

@UseFilters(new HttpExceptionFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.age < 100) {
      return this.usersService.create(createUserDto);
    }
    throw new ageValidationException();
  }

  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
