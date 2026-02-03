import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Purchase } from '../entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const { productName, price, purchaseDate } = createPurchaseDto;

    // Rechercher ou créer le produit
    let product = await this.productRepository.findOne({
      where: { name: productName },
    });

    if (!product) {
      product = this.productRepository.create({ name: productName });
      product = await this.productRepository.save(product);
    }

    const purchase = this.purchaseRepository.create({
      product,
      price: price.toFixed(2),
      purchaseDate,
    });

    return this.purchaseRepository.save(purchase);
  }

  // US-02: Historique des achats trié du plus récent au plus ancien
  async findAll(startDate?: string, endDate?: string): Promise<Purchase[]> {
    const queryBuilder = this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.product', 'product')
      .orderBy('purchase.purchaseDate', 'DESC')
      .addOrderBy('purchase.createdAt', 'DESC');

    if (startDate) {
      queryBuilder.andWhere('purchase.purchaseDate >= :startDate', {
        startDate,
      });
    }

    if (endDate) {
      queryBuilder.andWhere('purchase.purchaseDate <= :endDate', {
        endDate,
      });
    }

    return queryBuilder.getMany();
  }

  // US-03: Top produit (le plus acheté en nombre d'occurrences sur une période)
  async findTopProduct(
    startDate?: string,
    endDate?: string,
  ): Promise<{ productName: string; count: number } | null> {
    const queryBuilder = this.purchaseRepository
      .createQueryBuilder('purchase')
      .leftJoin('purchase.product', 'product')
      .select('product.name', 'productName')
      .addSelect('COUNT(purchase.id)', 'count')
      .groupBy('product.id')
      .addGroupBy('product.name')
      .orderBy('count', 'DESC')
      .limit(1);

    if (startDate) {
      queryBuilder.andWhere('purchase.purchaseDate >= :startDate', {
        startDate,
      });
    }

    if (endDate) {
      queryBuilder.andWhere('purchase.purchaseDate <= :endDate', {
        endDate,
      });
    }

    const result = await queryBuilder.getRawOne();

    if (!result || result.count === '0') {
      return null;
    }

    return {
      productName: result.productName,
      count: parseInt(result.count, 10),
    };
  }

  // US-04: Bilan financier (montant total des dépenses)
  async getTotalAmount(
    startDate?: string,
    endDate?: string,
  ): Promise<{ total: number }> {
    const queryBuilder = this.purchaseRepository
      .createQueryBuilder('purchase')
      .select('SUM(CAST(purchase.price AS DECIMAL))', 'total');

    if (startDate) {
      queryBuilder.andWhere('purchase.purchaseDate >= :startDate', {
        startDate,
      });
    }

    if (endDate) {
      queryBuilder.andWhere('purchase.purchaseDate <= :endDate', {
        endDate,
      });
    }

    const result = await queryBuilder.getRawOne();

    return {
      total: parseFloat(result?.total || '0'),
    };
  }
}

