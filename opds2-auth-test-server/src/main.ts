import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initGlobalConverters_GENERIC } from '@r2-shared-js/init-globals';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

initGlobalConverters_GENERIC();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.use(cookieParser());

  await app.listen(8282);
}
bootstrap();
