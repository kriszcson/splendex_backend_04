import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    article_number: { type: String, required: true },
    origin: { type: String, required: true },
    when_bought: { type: Date, required: true },
    when_expires: { type: Date, required: true }
})

export interface Product extends mongoose.Document {
    name: string;
    description: string;
    article_number: string;
    origin: string;
    when_bought: Date;
    when_expires: Date;
}
