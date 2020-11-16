import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { localUnauthorizedDoc } from 'src/auth/opds/local-unauthorized';
import { PubFeedService } from 'src/pub-feed/pub-feed.service';

@Controller('local')
export class LocalController {

    constructor(
        private readonly pubFeedService: PubFeedService,
        private authService: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post()
    async loginPost(@Request() req) {
      this.authService.login(req.user);
      return this.pubFeedService.pubFeed('local');
    }

    @Get()
    async loginGet(@Request() req) {
        return localUnauthorizedDoc();
    }

}
