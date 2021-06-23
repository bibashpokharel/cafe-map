import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNewEntry } from 'src/utils/createNew.response';
import { NearestCafe } from 'src/utils/nearestCafe.response';
import { CafeService } from './cafe.service';
import { FavouriteCafeDto } from './dto/favouriteCafe.dto';
import { NearCafeDto } from './dto/nearCafe.dto';
import { NewCafeDto } from './dto/newCafe.dto';

@Controller('cafe')
export class CafeController {
  constructor(private cafeService: CafeService) {}

  @Post('create')
  async newCafe(@Body() body: NewCafeDto): Promise<CreateNewEntry> {
    return this.cafeService.createNewCafe(body);
  }

  @Post('favourite')
  async favouriteCafe(@Body() body: FavouriteCafeDto): Promise<CreateNewEntry> {
    return this.cafeService.addFavouriteCafe(body);
  }

  @Post('nearest')
  async nearestCafe(@Body() body: NearCafeDto): Promise<NearestCafe> {
    return this.cafeService.findNearestCafe(body);
  }
}
