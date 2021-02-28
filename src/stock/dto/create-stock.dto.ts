import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateStockDTO {

    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'The count of the products.',
        default: ''
    })
    count: number;

    @IsNotEmpty()
    @ApiProperty({
        type: mongoose.Schema.Types.ObjectId,
        description: 'The unique id of the product.',
        default: ''
    })
    product_id: mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    @ApiProperty({
        type: mongoose.Schema.Types.ObjectId,
        description: 'The unique id of the warehouse witch contains the product(s).',
        default: ''
    })
    warehouse_id: mongoose.Schema.Types.ObjectId;
}