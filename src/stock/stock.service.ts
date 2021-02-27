import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from './stock.model';
import * as mongoose from 'mongoose';

import { CreateStockDTO } from './dto/create-stock.dto';
import { UpdateStockDTO } from './dto/update-stock.dto';

@Injectable()
export class StockService {

    constructor(@InjectModel('Stock') private readonly stockModel: Model<Stock>) { }


    async getAll(): Promise<Stock[]> {
        return await this.stockModel.find().exec();
    }

    async getById(id: mongoose.Schema.Types.ObjectId): Promise<Stock> {
        return await this.stockModel.findById(id);
    }

    async insertOne(createStockDTO: CreateStockDTO): Promise<Stock> {
        const addStock = new this.stockModel({
            count: createStockDTO.count,
            ...createStockDTO
        })
        await addStock.save();
        return addStock;
    }

    async updateById(id: mongoose.Schema.Types.ObjectId, updateStockDTO: UpdateStockDTO): Promise<Stock | NotFoundException> {
        return await this.stockModel
            .findOneAndUpdate({ _id: id }, updateStockDTO, { useFindAndModify: false, new: true })
            .exec()
            || new NotFoundException(404, 'Product not found!');
    }

    async deleteById(id: mongoose.Schema.Types.ObjectId): Promise<Object> {
        return await this.stockModel.findByIdAndDelete(id)
            || new NotFoundException(404, 'Product not found!');
    }
}
