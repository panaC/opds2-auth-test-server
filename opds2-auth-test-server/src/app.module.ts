import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicController } from './public/public.controller';
import { PubFeedService } from './pub-feed/pub-feed.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LocalJwtController } from './local-jwt/local-jwt.controller';
import { LocalController } from './local/local.controller';
import { BasicController } from './basic/basic.controller';


@Module({
  imports: [HttpModule, AuthModule, UsersModule],
  controllers: [AppController, PublicController, LocalJwtController, LocalController, BasicController],
  providers: [AppService, PubFeedService],
})
export class AppModule {}
