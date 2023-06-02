import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  create(createUserDto: CreateUserDto) {
    const createdUser = this.userModel.create(createUserDto);
    return createdUser;
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }
  async findUser(username: string) {
    return this.users.find((user) => user.username === username);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.userModel.findByIdAndUpdate(
      id,
      {
        $set: updateUserDto,
      },
      { new: true },
    );
    return updatedUser;
  }

  async remove(id: string) {
    await this.userModel.deleteOne({ _id: id });
    return `User with id: ${id} has been deleted`;
  }
}
