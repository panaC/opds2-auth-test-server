import { AuthService } from "src/auth/auth.service";
import { implicitUnauthorizedDoc } from "src/auth/opds/implicit-unauthorized";
import { PubFeedService } from "src/pub-feed/pub-feed.service";
import { resolveSelfUrl } from "src/utils";

import {
    Param, Controller, Get, Post, Render, Request, Response, UnauthorizedException, UseGuards,
} from "@nestjs/common";
import { JwtAuthImplicitGuard } from "src/auth/jwt-auth-implicit.guard";
import { ok } from "assert";

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

    @Get('login/:id?')
    @Render('pages/login')
    loginGet(@Request() req) {

        return { urlToSubmit: resolveSelfUrl(req.originalUrl) };
    }

    @Post('login/:id?')
    async loginPost(@Request() req, @Response() res, @Param('id') id: string) {
        const { username, password } = req.body;

        const redirect_uri = req.query["redirect_uri"] || "opds://authorize";
        delete req.query["redirect_uri"];

        try {
            ok(!req.query["response_type"] || req.query["response_type"] === "token", "OAuth 2.0 implicit flow, the response type is always token");
        } catch (e) {
            throw new UnauthorizedException(implicitUnauthorizedDoc({error: e.toString()}));
        }
        delete req.query["response_type"];

        const queryType = id === "google" ? "#" : "?";
        let query = '';
        for (const key in req.query) {
          if (req.query.hasOwnProperty(key)) {
            query += `${query ? '&' : queryType}${key.toString()}=${req.query[key]}`;
          }
        }

        const user = await this.authService.validateUser(username, password);
        if (user) {

            console.log("logged and redirect");
            
            const { access_token } = await this.authService.login(user);

            query += `${query ? '&' : queryType}id=${encodeURIComponent(resolveSelfUrl("/implicit"))}`;
            query += `&access_token=${access_token}`;
            query += `&token_type=bearer`;

            res.redirect(`${redirect_uri}${query}`);
            return ;
        }

        throw new UnauthorizedException(implicitUnauthorizedDoc())
    }
}
