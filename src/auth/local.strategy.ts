import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
    console.log('LocalStrategy', this.authService);
  }

  async validate(userName: string, pass: string, aa: string): Promise<any> {
    // console.log(this.authService);
    console.log('localstrategy');
    const user = await this.authService.validateUser(userName, pass);
    // console.log(this.authService);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
