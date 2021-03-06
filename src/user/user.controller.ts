import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('')
    getAll() {
        return this.userService.getAll();
    }/* 
    @Post('')
    insertOne(@Body() userDTO: UserDTO) {
        return this.userService.createUser(userDTO);
    } */
}