import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { implicitUnauthorizedDoc } from "./opds/implicit-unauthorized";

@Injectable()
export class JwtAuthImplicitGuard extends AuthGuard('jwt') {


    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {

            throw new UnauthorizedException(implicitUnauthorizedDoc({ err, info }));
        }
        return user;
    }
}
