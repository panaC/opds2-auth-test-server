
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Injectable()
export class BasicWithHeaderAuthGuard extends AuthGuard('basic') {

    canActivate(context: ExecutionContext) {

        const res: Response = context.switchToHttp().getResponse();
        res.setHeader("WWW-Authenticate", "Basic realm=\"auth test app LOGIN\"");

        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {

        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {

            throw new UnauthorizedException();
        }
        return user;
    }
}