import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './users/middlewares/logger.middleware';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0/nest'),
    UsersModule,
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users', 'books');
  }
}
