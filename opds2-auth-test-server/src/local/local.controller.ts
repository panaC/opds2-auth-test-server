import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { PubFeedService } from 'src/pub-feed/pub-feed.service';

@Controller('local')
export class LocalController {

    constructor(
        private readonly pubFeedService: PubFeedService,
        private authService: AuthService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    entryPoint() {
        return this.pubFeedService.pubFeed();
    }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req) {
      return this.authService.login(req.user);
    }


}
