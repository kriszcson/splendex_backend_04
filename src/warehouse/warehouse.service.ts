import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Model } from "mongoose";

import { CreateWarehouseDTO } from "./dto/create-warehouse.dto";
import { UpdateWarehouseDTO } from "./dto/update-warehouse.dto";
import { Warehouse } from './warehouse.model';

import { ProductStockDTO } from "src/stock/dto/product-stock.dto";
import { StockService } from "src/stock/stock.service";

@Injectable()
export class WarehouseService {

    constructor(
        @InjectModel('Warehouses') private readonly warehouseModel: Model<Warehouse>,
        private readonly stockService: StockService
    ) { }

    async getAll(): Promise<Warehouse[]> {
        return await this.warehouseModel.find().exec();
    }

    async insertOne(warehouseDTO: CreateWarehouseDTO): Promise<Warehouse> {
        const newWarehouse = new this.warehouseModel({
            address: warehouseDTO.address,
            ...warehouseDTO
        })
        await newWarehouse.save();
        return newWarehouse;
    }

    async getById(id: mongoose.Schema.Types.ObjectId): Promise<Warehouse | NotFoundException> {
        const warehouse = await this.warehouseModel.findById(id).exec();
        return warehouse
            || new NotFoundException(404, 'Product not found!');
    }

    async updateOne(id: mongoose.Schema.Types.ObjectId, productDTO: Partial<UpdateWarehouseDTO>): Promise<Warehouse | NotFoundException> {
        return await this.warehouseModel
            .findOneAndUpdate({ _id: id }, productDTO, { useFindAndModify: false, new: true })
            .exec()
            || new NotFoundException(404, 'Product not found!');
    }
    async deleteOne(id: mongoose.Schema.Types.ObjectId): Promise<Object> {
        return await this.warehouseModel.findByIdAndDelete(id)
            || new NotFoundException(404, 'Product not found!');
    }




    async getStockByWarehouseId(id: mongoose.Schema.Types.ObjectId): Promise<Object | NotFoundException> {
        let countSum = 0;
        let stocksOfProduct: Object[] = [];
        for (let stockOfProduct of await this.stockService.getStockOfProducts()) {
            if (stockOfProduct.warehouse._id == id) {
                stocksOfProduct.push({
                    stock_id: stockOfProduct._id,
                    product: stockOfProduct.product,
                    count: stockOfProduct.count,
                });
                countSum += stockOfProduct.count;
            }
        }
        if (stocksOfProduct.length > 0) {
            return {
                countSum: countSum,
                products: stocksOfProduct
            }
        } else {
            return new NotFoundException()
        };
    }

    async getStockByWarehouseAndProductId(warehouseId: mongoose.Schema.Types.ObjectId, productId: mongoose.Schema.Types.ObjectId): Promise<Object | NotFoundException> {
        let countSum = 0;
        let stocksOfProduct: Object[] = [];
        for (let stockOfProduct of await this.stockService.getStockOfProducts()) {
            if (stockOfProduct.warehouse._id == warehouseId &&
                stockOfProduct.product._id == productId) {
                stocksOfProduct.push({
                    stock_id: stockOfProduct._id,
                    product: stockOfProduct.product,
                    count: stockOfProduct.count,
                });
                countSum += stockOfProduct.count;
            }
        }
        if (stocksOfProduct.length > 0) {
            return {
                countSum: countSum,
                products: stocksOfProduct
            }
        } else {
            return new NotFoundException()
        };
    }
}
