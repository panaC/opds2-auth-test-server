import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from '../users/users.service';

export type UserWithoutPass = Omit<User, "password">;

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
  ) { }

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
}