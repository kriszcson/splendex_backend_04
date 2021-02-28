import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { WarehouseSchema } from './warehouse.model';

import { ProductsModule } from 'src/products/products.module';
import { ProductsSchema } from '../products/products.model';
import { StockModule } from 'src/stock/stock.module';
import { StockSchema } from 'src/stock/stock.model';


@Module({
    imports: [ProductsModule, StockModule,
        MongooseModule.forFeature([{
            name: 'Warehouses', schema: WarehouseSchema
        }]), MongooseModule.forFeature([{
            name: 'Products', schema: ProductsSchema
        }]), MongooseModule.forFeature([{
            name: 'Stock', schema: StockSchema
        }])],
    providers: [WarehouseService],
    controllers: [WarehouseController]
})
export class WarehouseModule { }
