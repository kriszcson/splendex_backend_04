import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('authentication')
@Controller()
export class AppController {
  constructor(private authService: AuthService) { }


  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({ description: 'Authorization successful.' })
  @ApiForbiddenResponse({ description: 'Unathorized.' })
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @ApiOkResponse({ description: 'Authorization successful.' })
  @ApiForbiddenResponse({ description: 'Unathorized.' })
  @Post('auth/signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return await this.authService.signUp(email, password);
  }

  @ApiOkResponse({ description: 'Sussessfully returned data.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('')
  welcome() {
    return { message: 'Welcome to my Stock API!' };
  }
}