import { Strategy } from 'passport-oauth2-client-password';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { passwordUnauthorizedDoc } from './opds/password-unauthorized';

// @Injectable()
// export class PasswordStrategy extends PassportStrategy(Strategy) {
//     constructor(private authService: AuthService) {
//         super();
//     }

//     async validate(clienId: string, clientSecret: string): Promise<any> {
//         // const user = await this.authService.validateUser(username, password);
//         // if (!user) {

//         //     throw new UnauthorizedException(passwordUnauthorizedDoc());
//         // }
//         // return user;
//     }
// }