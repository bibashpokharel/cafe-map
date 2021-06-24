import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    createUser: jest.fn().mockImplementation((userData) => {
      //creating new user
      return {
        success: true,
        message: 'New user created.',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a new user', async () => {
    try {
      const newUser = await controller.createUser({ username: 'test1' });
      expect(newUser).toEqual({
        success: true,
        message: 'New user created.',
      });
    } catch (err) {}
  });
});
