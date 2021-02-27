import { IsNotEmpty } from 'class-validator';
import { Date } from 'mongoose';

export class CreateProductDTO {
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    readonly description: string;
    @IsNotEmpty()
    readonly article_number: string;
    @IsNotEmpty()
    readonly origin: string;
    @IsNotEmpty()
    readonly when_bought: Date;
    @IsNotEmpty()
    readonly when_expires: Date;
}