import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateWarehouseDTO } from './dto/create-warehouse.dto';
import { UpdateWarehouseDTO } from './dto/update-warehouse.dto';
import { WarehouseService } from './warehouse.service';


@ApiTags('stock')
@Controller('warehouse')
export class WarehouseController {

    constructor(
        private readonly warehouseService: WarehouseService,
    ) { }


    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The list of the warehouses successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get()
    async getAll() {
        return await this.warehouseService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'A new warehouse successfully added.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Post()
    async insertProductWithCount(@Body() warehouseDTO: CreateWarehouseDTO) {
        return await this.warehouseService.insertOne(warehouseDTO);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The warehouse successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get(':id')
    async getById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.warehouseService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The warehouse successfully updated.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Put(':id')
    async updateById(
        @Param('id') id: mongoose.Schema.Types.ObjectId,
        @Body() updateWarehouseDTO: UpdateWarehouseDTO) {
        return await this.warehouseService.updateOne(id, updateWarehouseDTO);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The warehouse successfully deleted.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Delete(':id')
    async deleteById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return await this.warehouseService.deleteOne(id);
    }


    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'All products in a warehouse successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get('products/:warehouseId')
    async getStockByWarehouseId(@Param('warehouseId') id: mongoose.Schema.Types.ObjectId) {
        return await this.warehouseService.getStockByWarehouseId(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The product with counts in a warehouse successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get('products/:id/:productId')
    async getStockByWarehouseAndProductId(
        @Param('id') id: mongoose.Schema.Types.ObjectId,
        @Param('productId') productId: mongoose.Schema.Types.ObjectId
    ) {
        return await this.warehouseService.getStockByWarehouseAndProductId(id, productId);
    }

}

