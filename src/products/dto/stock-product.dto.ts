import * as mongoose from 'mongoose';

export class StockProductDTO {
    name: string;
    article_number: string;
    when_bought;
    when_expires;
}