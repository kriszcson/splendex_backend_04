import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './user/dto/user.dto';


@ApiTags('authentication')
@Controller()
export class AppController {
  constructor(private authService: AuthService) { }


  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({ description: 'Authorization successful.' })
  @ApiForbiddenResponse({ description: 'Unathorized.' })
  @Post('auth/login')
  async login(@Body() userDTO: UserDTO
  ) {
    return await this.authService.login(userDTO);
  }

  @ApiOkResponse({ description: 'Authorization successful.' })
  @ApiForbiddenResponse({ description: 'Unathorized.' })
  @Post('auth/signup')
  async signUp(
    @Body() userDTO: UserDTO
  ) {
    return await this.authService.signUp(userDTO);
  }

  @ApiOkResponse({ description: 'Sussessfully returned data.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('')
  welcome() {
    return { message: 'Welcome to my Stock API!' };
  }
}