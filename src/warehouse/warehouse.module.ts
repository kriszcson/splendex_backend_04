import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { WarehouseSchema } from './warehouse.model';

import { ProductsModule } from 'src/products/products.module';
import { ProductsSchema } from '../products/products.model';


@Module({
    imports: [ProductsModule, MongooseModule.forFeature([{
        name: 'Warehouses', schema: WarehouseSchema
    }]), MongooseModule.forFeature([{
        name: 'Products', schema: ProductsSchema
    }])],
    providers: [WarehouseService],
    controllers: [WarehouseController]
})
export class WarehouseModule { }
