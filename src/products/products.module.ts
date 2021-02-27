import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './products.model';

@Module({
  imports: [MongooseModule.forFeature([{
    name: 'Products', schema: ProductsSchema
  }])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule { }
