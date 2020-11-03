
import { Injectable } from '@nestjs/common';

export interface User {
    userId: number;
    username: string;
    password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'admin',
        password: 'admin',
      },
      {
        userId: 2,
        username: 'hello',
        password: 'world',
      },
      {
        userId: 3,
        username: 'edrlab',
        password: 'rocks',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}