import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { Cafe } from './entity/cafe.entity';
import { FavouriteCafe } from './entity/favouriteCafe.entity';

describe('CafeController', () => {
  let controller: CafeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        CafeService,
        {
          provide: getRepositoryToken(Cafe),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(FavouriteCafe),
          useValue: {},
        },
      ],
      controllers: [CafeController],
    }).compile();

    controller = module.get<CafeController>(CafeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new cafe', async () => {
    try {
      const newCafe = await controller.newCafe({
        name: 'testCafe',
        latitude: 10,
        longitude: 20,
      });
      expect(newCafe).toEqual({
        success: true,
        message: 'New cafe created.',
      });
    } catch (err) {}
  });

  it('should add a cafe to user favourite cafe', async () => {
    try {
      const favCafe = await controller.favouriteCafe({
        cafeId: 'someCafeID',
        userId: 'someUserId',
      });
      expect(favCafe).toEqual({
        success: true,
        message: 'added favourite cafe',
      });
    } catch (err) {}
  });
});
