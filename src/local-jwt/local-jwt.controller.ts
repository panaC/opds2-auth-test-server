import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthLocalGuard } from 'src/auth/jwt-auth-local.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { PubFeedService } from 'src/pub-feed/pub-feed.service';

@Controller('localjwt')
export class LocalJwtController {

    constructor(
        private readonly pubFeedService: PubFeedService,
        private authService: AuthService,
    ) { }

    @UseGuards(JwtAuthLocalGuard)
    @Get()
    entryPoint() {
        return this.pubFeedService.pubFeed("local jwt");
    }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req) {
      return this.authService.login(req.user);
    }


}
