import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from '../users/users.service';
import { randomBytes } from 'crypto';

export type UserWithoutPass = Omit<User, "password">;

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    private refreshTokenMap = new Map<number, string>();

    async validateUser(username: string, pass: string): Promise<UserWithoutPass | undefined> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const result: UserWithoutPass = {
                userId: user.userId,
                username: user.username,
            };
            return result;
        }
        return undefined;
    }

    async login(user: UserWithoutPass) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async loginOAuth2(user: UserWithoutPass) {
        const payload = { username: user.username, sub: user.userId };

        const refresh_token = randomBytes(256).toString('base64');
        this.refreshTokenMap.set(user.userId, refresh_token);

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token,
            token_type: "Bearer",
        };
    }

    async validateRefreshToken(refreshToken: string) {

        if (!refreshToken) {
            return undefined;
        }

        const res = Array.from(this.refreshTokenMap.entries()).find(([key, value]) => value === refreshToken);
        if (!res) {
            return undefined;
        }

        const [id] = res;
        const user = await this.usersService.findOneById(id);
        return user;
    }
}