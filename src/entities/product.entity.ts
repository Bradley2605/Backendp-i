import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity('produits')
@Unique(['name'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @CreateDateColumn({ name: 'date_creation' })
  createdAt: Date;

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases: Purchase[];
}

