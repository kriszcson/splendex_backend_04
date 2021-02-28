import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class UpdateStockDTO {
    @ApiProperty({
        type: Number,
        description: 'The count of the product.',
        default: ''
    })
    count: number;

    @ApiProperty({
        type: mongoose.Schema.Types.ObjectId,
        description: 'The unique id of the product.',
        default: ''
    })
    product_id: mongoose.Schema.Types.ObjectId;

    @ApiProperty({
        type: mongoose.Schema.Types.ObjectId,
        description: 'The unique id of the warehouse witch contains the product(s).',
        default: ''
    })
    warehouse_id: mongoose.Schema.Types.ObjectId;
}