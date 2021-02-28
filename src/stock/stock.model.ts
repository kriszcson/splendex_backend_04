import * as mongoose from 'mongoose';

export const StockSchema = new mongoose.Schema({
    count: { type: Number, required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId || Object, ref: 'Products', required: true },
    warehouse_id: { type: mongoose.Schema.Types.ObjectId || Object, ref: 'Warehouses', required: true }
})

export interface Stock extends mongoose.Document {
    count: number;
    product_id: any;
    warehouse_id: any;
}
