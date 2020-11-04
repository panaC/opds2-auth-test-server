import { AuthService } from "src/auth/auth.service";
import { implicitUnauthorizedDoc } from "src/auth/opds/implicit-unauthorized";
import { PubFeedService } from "src/pub-feed/pub-feed.service";
import { resolveSelfUrl } from "src/utils";

import {
    Controller, Get, Post, Render, Request, RequestMethod, Response, UnauthorizedException, UseGuards,
} from "@nestjs/common";
import { JwtAuthImplicitGuard } from "src/auth/jwt-auth-implicit.guard";

@Controller('implicit')
export class OauthImplicitController {

    constructor(
        private readonly pubFeedService: PubFeedService,
        private authService: AuthService,
    ) { }

    @UseGuards(JwtAuthImplicitGuard)
    @Get()
    entryPoint() {
        return this.pubFeedService.pubFeed("password OAUTH2");
    }

    @Get('login')
    @Render('pages/login')
    loginGet(@Request() req) {

        let query: string = '';
        for (const key in req.query) {
          if (req.query.hasOwnProperty(key)) {
            query += `${key.toString()}=${req.query[key]}&`;
          }
        }

        return { urlToSubmit: `${resolveSelfUrl("/auth")}?${query}`};
    }

    @Post('login')
    async loginPost(@Request() req, @Response() res) {
        const { username, password } = req.body;

        // TODO implement query paramter 
        // custom redirect_uri

        const user = await this.authService.validateUser(username, password);
        if (user) {

            console.log("logged and redirect");
            
            const { access_token } = await this.authService.login(user);

            const id = "";
            res.redirect(`opds://authorize/?id=${id}&access_token=${access_token}&token_type=bearer`)
            return ;
        }

        throw new UnauthorizedException(implicitUnauthorizedDoc())
    }
}
