import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({
  imports: [UserModule, AuthModule,
    ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DATABASE_URL, { useNewUrlParser: true }), ProductsModule, StockModule, WarehouseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
