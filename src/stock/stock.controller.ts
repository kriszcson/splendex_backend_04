import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import * as mongoose from 'mongoose';

import { CreateStockDTO } from './dto/create-stock.dto';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {

    constructor(private readonly stockService: StockService) { }

    @Get()
    async getAll() {
        return await this.stockService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.stockService.getById(id);
    }

    @Post()
    async insertOne(@Body() createStockDTO: CreateStockDTO) {
        return await this.stockService.insertOne(createStockDTO);
    }

    @Put(':id')
    async updateById(@Param('id') id: mongoose.Schema.Types.ObjectId, createStockDTO: CreateStockDTO) {
        return await this.stockService.updateById(id, createStockDTO);
    }

    @Delete('')
    async deleteById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.stockService.deleteById(id);
    }




    @Get('products')
    async getStockOfProducts() {
        return await this.stockService.getStockOfProducts();
    }

    @Get('products/:id')
    async getStockByProductId(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.stockService.getStockByProductId(id);
    }



    @Get('warehouses/:id')
    async getStockByWarehouseId(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.stockService.getStockByWarehouseId(id);
    }

    @Get('warehouses/:id/:productId')
    async getStockByWarehouseAndProductId(
        @Param('id') id: mongoose.Schema.Types.ObjectId,
        @Param('productId') productId: mongoose.Schema.Types.ObjectId
    ) {
        return await this.stockService.getStockByWarehouseAndProductId(id, productId);
    }
}
