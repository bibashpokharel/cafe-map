import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findNearest } from 'geolib';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { CreateNewEntry } from '../utils/createNew.response';
import { NearestCafe } from '../utils/nearestCafe.response';
import { getRepository, Repository } from 'typeorm';
import { FavouriteCafeDto } from './dto/favouriteCafe.dto';
import { NearCafeDto } from './dto/nearCafe.dto';
import { NewCafeDto } from './dto/newCafe.dto';
import { Cafe } from './entity/cafe.entity';
import { FavouriteCafe } from './entity/favouriteCafe.entity';

@Injectable()
export class CafeService {
  constructor(
    @InjectRepository(Cafe)
    private cafeRepo: Repository<Cafe>,

    @InjectRepository(FavouriteCafe)
    private favouriteCafeRepo: Repository<FavouriteCafe>,

    private userService: UserService,
  ) {}

  async createNewCafe(cafeData: NewCafeDto): Promise<CreateNewEntry> {
    try {
      const cafeExist: Cafe = await this.cafeRepo.findOne({
        name: cafeData.name,
      });
      if (!cafeExist) {
        await this.cafeRepo.save(cafeData);
        return {
          success: true,
          message: 'new cafe created',
        };
      } else {
        throw new Error('cafe with this already exist.');
      }
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async addFavouriteCafe(
    favouriteData: FavouriteCafeDto,
  ): Promise<CreateNewEntry> {
    try {
      const { cafeId, userId } = favouriteData;
      const newFavCafe: FavouriteCafe = this.favouriteCafeRepo.create();
      const cafe: Cafe = await this.cafeRepo.findOne({ id: cafeId });
      const user: User = await this.userService.findUserById(userId);
      newFavCafe.cafe = cafe;
      newFavCafe.user = user;
      await this.favouriteCafeRepo.save(newFavCafe);
      return {
        success: true,
        message: 'cafe added to favourite.',
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async findNearestCafe(currentData: NearCafeDto): Promise<NearestCafe> {
    try {
      const userFavouriteCafe = await getRepository(FavouriteCafe)
        .createQueryBuilder('favCafe')
        .leftJoinAndSelect('favCafe.cafe', 'cafe')
        .select(['favCafe.id', 'cafe.name', 'cafe.latitude', 'cafe.longitude'])
        .where('favCafe.userId=:userId', { userId: currentData.userId })
        .getMany();
      const allCafeLocation = userFavouriteCafe.map((i) => {
        return { latitude: i.cafe.latitude, longitude: i.cafe.longitude };
      });
      const nearestLocation: any = findNearest(
        {
          latitude: currentData.currentLatitude,
          longitude: currentData.currentLongitude,
        },
        allCafeLocation,
      );
      const allCafeName = userFavouriteCafe.map((i) => {
        if (
          i.cafe.latitude === nearestLocation.latitude &&
          i.cafe.longitude === nearestLocation.longitude
        ) {
          return i.cafe.name;
        }
      });
      const cafe = allCafeName.filter(Boolean);
      return {
        success: true,
        cafe: cafe[0],
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}
