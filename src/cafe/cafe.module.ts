import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { Cafe } from './entity/cafe.entity';
import { FavouriteCafe } from './entity/favouriteCafe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cafe, FavouriteCafe]), UserModule],
  controllers: [CafeController],
  providers: [CafeService],
})
export class CafeModule {}
