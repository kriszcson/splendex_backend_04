import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateStockDTO {

    @IsNotEmpty()
    count: number;
    @IsNotEmpty()
    product_id: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty()
    warehouse_id: mongoose.Schema.Types.ObjectId;
}