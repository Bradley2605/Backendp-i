import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Purchase } from '../entities/purchase.entity';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Purchase])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}

