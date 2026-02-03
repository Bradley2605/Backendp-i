import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { GetPurchasesQueryDto } from './dto/get-purchases-query.dto';
import { Purchase } from '../entities/purchase.entity';

@Controller('achats')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return this.purchasesService.create(createPurchaseDto);
  }

  // US-02: Historique des achats
  @Get()
  findAll(@Query() query: GetPurchasesQueryDto): Promise<Purchase[]> {
    return this.purchasesService.findAll(query.startDate, query.endDate);
  }

  // US-03: Top produit
  @Get('top-produit')
  async findTopProduct(@Query() query: GetPurchasesQueryDto) {
    const result = await this.purchasesService.findTopProduct(
      query.startDate,
      query.endDate,
    );

    if (!result) {
      return {
        message: 'Aucun produit trouvé pour cette période',
        productName: null,
        count: 0,
      };
    }

    return result;
  }

  // US-04: Bilan financier
  @Get('bilan')
  getTotalAmount(@Query() query: GetPurchasesQueryDto) {
    return this.purchasesService.getTotalAmount(
      query.startDate,
      query.endDate,
    );
  }
}

