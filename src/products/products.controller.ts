import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import * as mongoose from 'mongoose';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
        return this.productService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return this.productService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async insertOne(
        @Body() product: CreateProductDTO
    ) {
        return await this.productService.insertOne(product);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateOne(
        @Param('id') id: mongoose.Schema.Types.ObjectId,
        @Body() product: Partial<UpdateProductDTO>
    ) {
        const updatedProduct = await this.productService.updateOne(id, product);
        return updatedProduct;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return this.productService.deleteOne(id);
    }
}
