import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { CreateWarehouseDTO } from './dto/create-warehouse.dto';
import { UpdateWarehouseDTO } from './dto/update-warehouse.dto';
import { WarehouseService } from './warehouse.service';

@Controller('warehouses')
export class WarehouseController {

    constructor(
        private readonly warehouseService: WarehouseService,
        private readonly productsService: ProductsService
    ) { }


    @Get()
    async getAll() {
        return await this.warehouseService.getAll();
    }

    @Post()
    async insertProductWithCount(@Body() warehouseDTO: CreateWarehouseDTO) {
        return await this.warehouseService.insertOne(warehouseDTO);
    }

    @Get(':id')
    async getById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.warehouseService.getById(id);
    }

    @Put(':id')
    async updateById(
        @Param('id') id: mongoose.Schema.Types.ObjectId,
        @Body() updateWarehouseDTO: UpdateWarehouseDTO) {
        return await this.warehouseService.updateOne(id, updateWarehouseDTO);
    }


    @Delete(':id')
    async deleteById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.warehouseService.deleteOne(id);
    }

}

