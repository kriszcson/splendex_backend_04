import * as mongoose from 'mongoose';

export const StockSchema = new mongoose.Schema({
    count: { type: Number, required: true },
    product_article_number: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
    warehouse_number: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouses', required: true }
})

export interface Stock extends mongoose.Document {
    count: number;
    product_article_number: mongoose.Schema.Types.ObjectId;
    warehouse_number: mongoose.Schema.Types.ObjectId;
}
