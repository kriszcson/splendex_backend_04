import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './user/role/roles.decorator';
import { UserDTO } from './user/dto/user.dto';


@ApiTags('authentication')
@Controller()
export class AppController {
  constructor(private authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(
    @Body() @Request() req
  ) {
    return await this.authService.login(req.email, req.password);
  }

  @Public()
  @Post('auth/signup')
  async signUp(
    @Body() @Request() req
  ) {
    return await this.authService.signUp(req.email, req.password, [1]);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await req.user;
  }
}