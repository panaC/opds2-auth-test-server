import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initGlobalConverters_GENERIC } from '@r2-shared-js/init-globals';

initGlobalConverters_GENERIC();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8282);
}
bootstrap();
