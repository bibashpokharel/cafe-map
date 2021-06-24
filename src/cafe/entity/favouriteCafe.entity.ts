import { User } from '../../user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cafe } from './cafe.entity';

@Entity()
export class FavouriteCafe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((type) => User, {
    cascade: true,
    onUpdate: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  user: User;

  @OneToOne((type) => Cafe, {
    cascade: true,
    onUpdate: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  cafe: Cafe;
}
