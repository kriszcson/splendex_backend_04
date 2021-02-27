import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateStockDTO {

    @IsNotEmpty()
    count: number;
    @IsNotEmpty()
    product_article_number: mongoose.Schema.Types.ObjectId;
    @IsNotEmpty()
    warehouse_number: mongoose.Schema.Types.ObjectId;
}