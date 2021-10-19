import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
    console.log('authService');
  }

  async validateUser(userName: string, pass: string): Promise<any> {
    console.log('Auth Service validate user');
    const user = await this.userService.findOne(userName);
    if (user?.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      payload: this.jwtService.sign(payload),
    };
  }
}
