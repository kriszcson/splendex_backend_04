import * as mongoose from 'mongoose';

export const WarehouseSchema = new mongoose.Schema({
    address: { type: String, required: true },
    warehouse_number: { type: Number, required: true }
})

export interface Warehouse extends mongoose.Document {
    address: string;
    warehouse_number: number;
}
