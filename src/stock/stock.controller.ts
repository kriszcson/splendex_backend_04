import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateStockDTO } from './dto/create-stock.dto';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {

    constructor(private readonly stockService: StockService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
        return await this.stockService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.stockService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async insertOne(@Body() createStockDTO: CreateStockDTO) {
        return await this.stockService.insertOne(createStockDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateById(@Param('id') id: mongoose.Schema.Types.ObjectId, createStockDTO: CreateStockDTO) {
        return await this.stockService.updateById(id, createStockDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('')
    async deleteById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.stockService.deleteById(id);
    }



    @UseGuards(JwtAuthGuard)
    @Get('products')
    async getStockOfProducts() {
        return await this.stockService.getStockOfProducts();
    }

    @UseGuards(JwtAuthGuard)
    @Get('products/:id')
    async getStockByProductId(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.stockService.getStockByProductId(id);
    }
}
