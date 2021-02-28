import * as mongoose from 'mongoose';

export class ProductStockDTO {
    _id: mongoose.Schema.Types.ObjectId;
    count: number;
    product: {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
        article_number: string;
        when_bought;
        when_expires;
    };
    warehouse: {
        _id: mongoose.Schema.Types.ObjectId;
        address: string;
    }

}