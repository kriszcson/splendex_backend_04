import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class ProductStockDTO {
    @ApiProperty({
        type: mongoose.Schema.Types.ObjectId,
        description: 'The unique id of the order.',
        default: ''
    })
    _id: mongoose.Schema.Types.ObjectId;

    @ApiProperty({
        type: Number,
        description: 'The count of the products.',
        default: ''
    })
    count: number;

    @ApiProperty({
        type: Object,
        description: 'The most important properties of the current product.',
        default: ''
    })
    product: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
        article_number: string;
        when_bought;
        when_expires;
    };

    @ApiProperty({
        type: Object,
        description: 'The properties of the warehouse witch contains the current products.',
        default: ''
    })
    warehouse: {
        _id: mongoose.Schema.Types.ObjectId;
        address: string;
    }

}