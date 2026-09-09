import { Injectable } from '@nestjs/common';

interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Vinicius conti',
      email: 'viniciusconti@gmail.com',
      password: 'senha123',
    },
    {
      userId: 2,
      username: 'maria',
      email: 'maria@gmail.com',
      password: 'guess',
    },
  ];

  async findOneInMemory(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
