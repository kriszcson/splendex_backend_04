import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StockController } from './stock.controller';
import { StockService } from './stock.service';

import { ProductsSchema } from 'src/products/products.model';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule, MongooseModule.forFeature([{
    name: 'Warehouse', schema: ProductsSchema
  }])],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule { }
