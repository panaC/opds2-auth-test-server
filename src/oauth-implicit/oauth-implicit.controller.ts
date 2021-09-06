import { AuthService } from "src/auth/auth.service";
import { implicitUnauthorizedDoc } from "src/auth/opds/implicit-unauthorized";
import { PubFeedService } from "src/pub-feed/pub-feed.service";
import { resolveSelfUrl } from "src/utils";

import {
    Controller, Get, Post, Render, Request, Response, UnauthorizedException, UseGuards, Query,
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

    @Get('login')
    @Render('pages/login')
    loginGet(@Request() req, @Query('lang') lang: string) {

        const i18n_fr = {
          _home: "Connectez-vous",
          _username: "nom d'utilisateur",
          _password: "mot de passe",
          _submit: "connexion",
        };

        let ret = {
          urlToSubmit: resolveSelfUrl(req.originalUrl),
        };
        if (lang === "fr")
          ret = { ...ret, ...i18n_fr };

        return ret;
    }

    @Post('login')
    async loginPost(@Request() req, @Response() res) {
        const { username, password } = req.body;

        const redirect_uri = req.query["redirect_uri"] || "opds://authorize";
        delete req.query["redirect_uri"];

        try {
            ok(!req.query["response_type"] || req.query["response_type"] === "token", "OAuth 2.0 implicit flow, the response type is always token");
        } catch (e) {
            throw new UnauthorizedException(implicitUnauthorizedDoc({error: e.toString()}));
        }
        delete req.query["response_type"];
        
        let query = '';
        for (const key in req.query) {
          if (req.query.hasOwnProperty(key)) {
            query += `${query ? '&' : '?'}${key.toString()}=${req.query[key]}`;
          }
        }

        const user = await this.authService.validateUser(username, password);
        if (user) {

            console.log("logged and redirect");
            
            const { access_token } = await this.authService.login(user);

            query += `${query ? '&' : '?'}id=${encodeURIComponent(resolveSelfUrl("/implicit"))}`;
            query += `&access_token=${access_token}`;
            query += `&token_type=bearer`;

            res.redirect(`${redirect_uri}${query}`);
            return ;
        }

        throw new UnauthorizedException(implicitUnauthorizedDoc())
    }
}
