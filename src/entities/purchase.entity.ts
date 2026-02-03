import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('achats')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.purchases, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'produit_id' })
  product: Product;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: string;

  @Column({ name: 'date_achat', type: 'date' })
  purchaseDate: string;

  @CreateDateColumn({ name: 'date_ajout' })
  createdAt: Date;
}

