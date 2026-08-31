import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException('E-mail or password is incorrect!');
    }

    const payload = { sub: user.userId, email: user.email };

    let access_token = '';

    try {
      access_token = await this.jwtService.signAsync(payload);
    } catch (error) {
      console.log(error);
    }

    return { access_token };
  }
}
