import * as mongoose from 'mongoose';
import { Role } from './role/role.enum';

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: [], required: true }
})

export interface User extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId
    readonly email: string;
    readonly password: string;
    readonly roles: Role[];
}