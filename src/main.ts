import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/exceptionfilters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); /* 
  app.useGlobalFilters(new HttpExceptionFilter()); */
  await app.listen(3000);
}
bootstrap();
