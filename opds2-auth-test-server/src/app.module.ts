import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicController } from './public/public.controller';
import { PublicService } from './public/public.service';
import { PublicModule } from './public/public.module';

@Module({
  imports: [PublicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
