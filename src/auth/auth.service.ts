import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<any> {
        if (await this.userService.findByEmail(email)) {
            const user = await this.userService.findByEmail(email);
            return bcrypt.compare(pass, user.password);
        }
    }


    async login(user: any): Promise<Object> {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signUp(email, password): Promise<Object> {
        const newUser = await this.userService.createUser(email, password);
        if (newUser) {
            return this.login(newUser);
        }
        else {
            return { message: 'Email exists!' }
        }
    }
}
