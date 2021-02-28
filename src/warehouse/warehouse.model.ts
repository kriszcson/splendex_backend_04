import * as mongoose from 'mongoose';

export const WarehouseSchema = new mongoose.Schema({
    address: { type: String, required: true }
})

export interface Warehouse extends mongoose.Document {
    address: string;
}
