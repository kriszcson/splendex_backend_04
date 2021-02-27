import * as mongoose from 'mongoose';

export class UpdateStockDTO {
    count: number;
    product_article_number: mongoose.Schema.Types.ObjectId;
    warehouse_number: mongoose.Schema.Types.ObjectId;
}