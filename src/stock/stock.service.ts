import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from './stock.model';
import * as mongoose from 'mongoose';

import { CreateStockDTO } from './dto/create-stock.dto';
import { UpdateStockDTO } from './dto/update-stock.dto';
import { ProductStockDTO } from './dto/product-stock.dto';
import { count } from 'console';

@Injectable()
export class StockService {

    constructor(@InjectModel('Stock') private readonly stockModel: Model<Stock>) { }


    async getAll(): Promise<any> {
        const fullStock = await this.stockModel.find().populate('product_id warehouse_id').exec();
        return fullStock;
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

    async getFullStockOfProductById(id: mongoose.Schema.Types.ObjectId) {
        const fullStockOfProducts = await this.getAll();
    }

    async getStockOfProducts(): Promise<ProductStockDTO[]> {
        let productStockDTO: ProductStockDTO[] = [];
        const stockOfProducts = await this.getAll();
        for (let stockOfSingleProduct of stockOfProducts) {
            productStockDTO.push({
                _id: stockOfSingleProduct._id,
                count: stockOfSingleProduct.count,
                product: {
                    _id: stockOfSingleProduct.product_id._id,
                    name: stockOfSingleProduct.product_id.name,
                    article_number: stockOfSingleProduct.product_id.article_number,
                    when_bought: stockOfSingleProduct.product_id.when_bought,
                    when_expires: stockOfSingleProduct.product_id.when_expires
                },
                warehouse: {
                    _id: stockOfSingleProduct.warehouse_id._id,
                    address: stockOfSingleProduct.warehouse_id.address
                }
            })
        }
        return productStockDTO;
    }

    async getStockByProductId(id: mongoose.Schema.Types.ObjectId): Promise<ProductStockDTO[] | NotFoundException> {
        let stocksOfProduct: ProductStockDTO[] = [];
        for (let stockOfProduct of await this.getStockOfProducts()) {
            if (stockOfProduct.product._id == id) {
                stocksOfProduct.push(stockOfProduct);
            }
        }
        if (stocksOfProduct.length > 0) return stocksOfProduct;
        else return new NotFoundException();
    }
}
