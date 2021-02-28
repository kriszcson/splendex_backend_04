import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockSchema } from 'src/stock/stock.model';

import { ProductsModule } from 'src/products/products.module';
import { ProductsSchema } from 'src/products/products.model';

@Module({
  imports: [ProductsModule, MongooseModule.forFeature([{
    name: 'Stock', schema: StockSchema
  }]), ProductsModule, MongooseModule.forFeature([{
    name: 'Products', schema: ProductsSchema
  }])
  ],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule { }
