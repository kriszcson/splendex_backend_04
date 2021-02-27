import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import * as mongoose from 'mongoose';

import { Product } from './products.model';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Products') private readonly productsModel: Model<Product>) { }


    async getAll(): Promise<Object[]> {
        const allProduct = await this.productsModel.find().exec();
        return allProduct;
    }

    async getById(id: mongoose.Schema.Types.ObjectId): Promise<Product | NotFoundException> {
        let product: Product;
        product = await this.productsModel.findById(id).exec();
        return product
            || new NotFoundException(404, 'Product not found!');
    }

    async insertOne(product: CreateProductDTO): Promise<Product> {
        const newProduct = new this.productsModel({
            name: product.name, ...product
        });
        await newProduct.save();
        return newProduct;
    }

    async updateOne(id: mongoose.Schema.Types.ObjectId, productDTO: Partial<UpdateProductDTO>): Promise<Product | Object> {
        return await this.productsModel
            .findOneAndUpdate({ _id: id }, productDTO, { useFindAndModify: false, new: true })
            .exec()
            || new NotFoundException(404, 'Product not found!');
    }
    async deleteOne(id: mongoose.Schema.Types.ObjectId): Promise<Object> {
        return await this.productsModel.findByIdAndDelete(id)
            || new NotFoundException(404, 'Product not found!');
    }

}
