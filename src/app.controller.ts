import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('auth/signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return await this.authService.signUp(email, password);
  }


  @UseGuards(JwtAuthGuard)
  @Get('')
  test() {
    return { message: "YES, You ARE INNN, SMALL BITCH" };
  }
}