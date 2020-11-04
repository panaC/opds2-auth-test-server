
import { ExecutionContext, Injectable, UnauthorizedException, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { request } from 'http';
import { AuthService } from './auth.service';
import { passwordUnauthorizedDoc } from './opds/password-unauthorized';

// @Injectable()
// export class PasswordAuthGuard extends AuthGuard('oauth2-client-password') {

//     canActivate(context: ExecutionContext) {

//         // Add your custom authentication logic here
//         // for example, call super.logIn(request) to establish a session.
//         return super.canActivate(context);
//     }

//     handleRequest(err, user, info) {

//         // You can throw an exception based on either "info" or "err" arguments
//         if (err || !user) {

//             throw new UnauthorizedException(passwordUnauthorizedDoc({ err, info }));
//         }
//         return user;
//     }

// }

@Injectable()
export class PasswordAuthGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext) {

        const req = context.switchToHttp().getRequest<Request>();
        console.log(req.body);

        if (typeof req.body !== "object") {
            throw new UnauthorizedException(passwordUnauthorizedDoc());
        }

        const grantType = req.body.grant_type;
        switch (grantType) {

            case 'password': {

                const { username, password } = req.body;
                const user = await this.authService.validateUser(username, password);
                console.log("user found : ", user);
                
                if (!user) {
                    throw new UnauthorizedException(passwordUnauthorizedDoc({ err: "bad username or password"}));
                }
                req.user = user;
                break;
            }

            case 'refresh_token': {

                const { refresh_token } = req.body;
                const user = await this.authService.validateRefreshToken(refresh_token);
                console.log("user found : ", user);
                
                if (!user) {
                    throw new UnauthorizedException(passwordUnauthorizedDoc({ err: "bad refresh_token"}));
                }
                req.user = user;
                break;
            }

            default: {

                console.warn("wrong grant_type", grantType);
                throw new UnauthorizedException(passwordUnauthorizedDoc({ err: "wrong grant_type" }));
                
                break;
            }
        }

        // // handle grant_type : password or refresh_token
        // if (req.body?.grant_type !== "password") {
        //     console.warn("wrong grant_type value", req.body.grant_type, "!== password");
        // }


        return true;
    }

}