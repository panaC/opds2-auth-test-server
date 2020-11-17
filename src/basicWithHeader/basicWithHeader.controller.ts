import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { BasicWithHeaderAuthGuard } from 'src/auth/basicwithHeader.guard';
import { PubFeedService } from 'src/pub-feed/pub-feed.service';

@Controller('basicwithheader')
export class BasicWithHeaderController {

    constructor(
        private readonly pubFeedService: PubFeedService,
        private authService: AuthService,
    ) { }

    @UseGuards(BasicWithHeaderAuthGuard)
    @Get()
    async loginPost(@Request() req) {
        return this.pubFeedService.pubFeed('basic');
    }
}
