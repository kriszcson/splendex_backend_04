import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Date } from 'mongoose';

export class CreateProductDTO {
    @ApiProperty({
        type: String,
        description: 'The name of the product',
        default: ''
    })
    @IsNotEmpty()
    readonly name: string;


    @ApiProperty({
        type: String,
        description: 'The description of the product',
        default: ''
    })
    @IsNotEmpty()
    readonly description: string;


    @ApiProperty({
        type: String,
        description: 'The unique product-code of the product',
        default: ''
    })
    @IsNotEmpty()
    readonly article_number: string;


    @ApiProperty({
        type: String,
        description: 'The origin of the product.',
        default: ''
    })
    @IsNotEmpty()
    readonly origin: string;


    @ApiProperty({
        type: Date,
        description: 'The date when we get the product.',
        default: ''
    })
    @IsNotEmpty()
    readonly when_bought: Date;


    @ApiProperty({
        type: Date,
        description: 'The date of the last day, when we can sell the product.',
        default: ''
    })
    @IsNotEmpty()
    readonly when_expires: Date;
}