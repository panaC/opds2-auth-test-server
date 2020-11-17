import { HttpModule, Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { BasicController } from "./basic/basic.controller";
import { BasicWithHeaderController } from "./basicWithHeader/basicWithHeader.controller";
import { CookieController } from "./cookie/cookie.controller";
import { LocalJwtController } from "./local-jwt/local-jwt.controller";
import { LocalController } from "./local/local.controller";
import { OauthImplicitController } from "./oauth-implicit/oauth-implicit.controller";
import { OauthPasswordController } from "./oauth-password/oauth-password.controller";
import { PubFeedService } from "./pub-feed/pub-feed.service";
import { PublicController } from "./public/public.controller";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [HttpModule, AuthModule, UsersModule],
  controllers: [
    AppController,
    PublicController,
    LocalJwtController,
    LocalController,
    BasicController,
    OauthPasswordController,
    OauthImplicitController,
    CookieController,
    BasicWithHeaderController,
  ],
  providers: [AppService, PubFeedService],
})
export class AppModule {}
