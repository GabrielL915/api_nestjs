import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  create(createBookDto: CreateBookDto) {
    const createdBook = this.bookModel.create(createBookDto);
    return createdBook;
  }

  findAll() {
    return this.bookModel.find();
  }

  findOne(id: string) {
    return this.bookModel.findById(id);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    const updatedBook = this.bookModel.findByIdAndUpdate(
      id,
      {
        $set: updateBookDto,
      },
      { new: true },
    );
    return updatedBook;
  }

  async remove(id: string) {
    await this.bookModel.deleteOne({ _id: id });
    return `Book with id: ${id} has been deleted`;
  }
}
