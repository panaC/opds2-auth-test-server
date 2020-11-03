import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthPasswordGuard } from 'src/auth/jwt-auth-Password.guard';
import { PasswordAuthGuard } from 'src/auth/password.guard';
import { PubFeedService } from 'src/pub-feed/pub-feed.service';

@Controller('password')
export class OauthPasswordController {

    constructor(
        private readonly pubFeedService: PubFeedService,
        private authService: AuthService,
    ) { }

    @UseGuards(JwtAuthPasswordGuard)
    @Get()
    entryPoint() {
        return this.pubFeedService.pubFeed("password OAUTH2");
    }

    @UseGuards(PasswordAuthGuard)
    @Post()
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
}
