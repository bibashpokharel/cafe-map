import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cafe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @CreateDateColumn()
  createdAt: Date;
}
