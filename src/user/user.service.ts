import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';

import { Model } from "mongoose";
import { UserDTO } from "./dto/user.dto";
import { User } from "./user.model";


@Injectable()
export class UserService {

    constructor(@InjectModel('Users') private readonly userModel: Model<User>) { }

    async getAll() {
        const allUsers = await this.userModel.find().exec();
        return allUsers.map((user) => ({
            _id: user.id,
            email: user.email,
            password: user.password
        }))
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }

    async createUser(userDTO: UserDTO) {
        const haveUser = await this.findByEmail(userDTO.email);
        if (haveUser) {
            return null;
        } else {
            const user = new this.userModel({
                email: userDTO.email,
                password: await this.hashPassword(userDTO.password)
            })
            await user.save();
            return user;
        }
    }

    private async hashPassword(password: string) {
        const saltOrRounds = 10;;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }
}