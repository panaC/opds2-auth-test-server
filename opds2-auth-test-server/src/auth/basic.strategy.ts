import { BasicStrategy as BasicStrategyPassport } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { basicUnauthorizedDoc } from './opds/basic-unauthorized';
import { Request } from 'express';

@Injectable()
export class BasicStrategy extends PassportStrategy(BasicStrategyPassport) {
    constructor(private authService: AuthService) {
        super({
            realm: "login",
            passReqToCallback: false,
        });
    }

    authenticate(req: Request, options?: object) {

        return super.authenticate(req, options);
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {

            throw new UnauthorizedException(basicUnauthorizedDoc());
        }
        return user;
    }
}