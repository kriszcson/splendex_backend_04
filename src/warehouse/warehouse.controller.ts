import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateWarehouseDTO } from './dto/create-warehouse.dto';
import { UpdateWarehouseDTO } from './dto/update-warehouse.dto';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {

    constructor(
        private readonly warehouseService: WarehouseService,
    ) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
        return await this.warehouseService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async insertProductWithCount(@Body() warehouseDTO: CreateWarehouseDTO) {
        return await this.warehouseService.insertOne(warehouseDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.warehouseService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateById(
        @Param('id') id: mongoose.Schema.Types.ObjectId,
        @Body() updateWarehouseDTO: UpdateWarehouseDTO) {
        return await this.warehouseService.updateOne(id, updateWarehouseDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.warehouseService.deleteOne(id);
    }


    @UseGuards(JwtAuthGuard)
    @Get('products/:id')
    async getStockByWarehouseId(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.warehouseService.getStockByWarehouseId(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('products/:id/:productId')
    async getStockByWarehouseAndProductId(
        @Param('id') id: mongoose.Schema.Types.ObjectId,
        @Param('productId') productId: mongoose.Schema.Types.ObjectId
    ) {
        return await this.warehouseService.getStockByWarehouseAndProductId(id, productId);
    }

}

