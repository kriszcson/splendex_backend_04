import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }


    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The list of products successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get()
    async getAll() {
        return this.productService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The product successfully returned.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get(':id')
    async getById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return this.productService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The product successfully inserted.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Post()
    async insertOne(
        @Body() product: CreateProductDTO
    ) {
        return await this.productService.insertOne(product);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The list of products successfully updated.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Put(':id')
    async updateOne(
        @Param('id') id: mongoose.Schema.Types.ObjectId,
        @Body() product: Partial<UpdateProductDTO>
    ) {
        const updatedProduct = await this.productService.updateOne(id, product);
        return updatedProduct;
    }

    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ description: 'The list of products successfully deleted.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Delete(':id')
    async deleteOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return this.productService.deleteOne(id);
    }
}
