import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Model } from "mongoose";

import { CreateWarehouseDTO } from "./dto/create-warehouse.dto";
import { UpdateWarehouseDTO } from "./dto/update-warehouse.dto";
import { Warehouse } from './warehouse.model';

import { Product } from "../products/products.model";

@Injectable()
export class WarehouseService {

    constructor(
        @InjectModel('Warehouses') private readonly warehouseModel: Model<Warehouse>,
        @InjectModel('Products') private readonly productsModel: Model<Product>
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

}
