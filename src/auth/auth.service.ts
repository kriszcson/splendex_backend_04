import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { UserDTO } from "src/user/dto/user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        if (await this.userService.findByEmail(email)) {
            const user = await this.userService.findByEmail(email);
            return bcrypt.compare(pass, user.password);
        }
    }

    async login(email: string, password: string): Promise<Object> {
        const user = await this.userService.findByEmail(email);
        const payload = { email: email, sub: user._id, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signUp(email: string, password: string, roles: number[]): Promise<Object> {
        const newUser: UserDTO = await this.userService.createUser(email, password, roles);
        if (newUser) {
            return this.login(newUser.email, newUser.password);
        }
        else {
            return { message: 'Email exists!' }
        }
    }
}
