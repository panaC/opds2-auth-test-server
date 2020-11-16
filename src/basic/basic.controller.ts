import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { BasicAuthGuard } from 'src/auth/basic.guard';
import { PubFeedService } from 'src/pub-feed/pub-feed.service';

@Controller('basic')
export class BasicController {

    constructor(
        private readonly pubFeedService: PubFeedService,
        private authService: AuthService,
    ) { }

    @UseGuards(BasicAuthGuard)
    @Get()
    async loginPost(@Request() req) {
        return this.pubFeedService.pubFeed('basic');
    }
}
