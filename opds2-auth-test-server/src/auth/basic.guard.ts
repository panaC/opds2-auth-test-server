
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { basicUnauthorizedDoc } from './opds/basic-unauthorized';

@Injectable()
export class BasicAuthGuard extends AuthGuard('basic') {

    canActivate(context: ExecutionContext) {

        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {

        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {

            throw new UnauthorizedException(basicUnauthorizedDoc({ err, info }));
        }
        return user;
    }
}