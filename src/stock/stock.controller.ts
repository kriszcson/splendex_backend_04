import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateStockDTO } from './dto/create-stock.dto';
import { StockService } from './stock.service';


@ApiTags('stock')
@Controller('stock')
export class StockController {

    constructor(private readonly stockService: StockService) { }


    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The list of the complete stock successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get()
    async getAll() {
        return await this.stockService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The pack successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get(':id')
    async getById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.stockService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The pack successfully inserted.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Post()
    async insertOne(@Body() createStockDTO: CreateStockDTO) {
        return await this.stockService.insertOne(createStockDTO);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The pack successfully updated.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Put(':id')
    async updateById(@Param('id') id: mongoose.Schema.Types.ObjectId, createStockDTO: CreateStockDTO) {
        return await this.stockService.updateById(id, createStockDTO);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The pack successfully deleted.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Delete('')
    async deleteById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.stockService.deleteById(id);
    }


    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The list of the complete stock successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get('products')
    async getStockOfProducts() {
        return await this.stockService.getStockOfProducts();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The list of the stock of a product successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get('products/:id')
    async getStockByProductId(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.stockService.getStockByProductId(id);
    }
}
