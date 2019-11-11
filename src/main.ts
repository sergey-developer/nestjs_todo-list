import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { BaseGlobalHttpExceptionFilter } from './exceptionsFilters/base-global-http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new BaseGlobalHttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
      validationError: {target: false, value: false},
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
  }));

  await app.listen(3000);
}
bootstrap();
