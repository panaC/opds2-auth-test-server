import { Controller, Get, Post, Request, Response, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response as expressResponse, Request as expressRequest } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { PubFeedService } from 'src/pub-feed/pub-feed.service';

@Controller('cookie')
export class CookieController {

    constructor(
        private readonly pubFeedService: PubFeedService,
        private authService: AuthService,
    ) { }

    // @UseGuards(BasicAuthGuard)
    @Get()
    async feed(@Request() req: expressRequest) {

        console.log("cookies", req.cookies);
        
        if (req.cookies?.test === "hello world") {
            return this.pubFeedService.pubFeed('cookie');
        } 
        throw new UnauthorizedException();
    }

    @Get('login')
    async login(@Response() res: expressResponse) {

        res.cookie("test", "hello world");
        res.redirect('/cookie');
        // throw new UnauthorizedException();
    }

}
