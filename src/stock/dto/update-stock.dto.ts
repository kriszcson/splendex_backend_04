import * as mongoose from 'mongoose';

export class UpdateStockDTO {
    count: number;
    product_id: mongoose.Schema.Types.ObjectId;
    warehouse_id: mongoose.Schema.Types.ObjectId;
}