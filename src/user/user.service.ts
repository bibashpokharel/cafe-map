import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNewEntry } from 'src/utils/createNew.response';
import { Repository } from 'typeorm';
import { NewUserDto } from './dto/newUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createNewUser(userData: NewUserDto): Promise<CreateNewEntry> {
    try {
      const userExist = await this.userRepo.findOne({
        username: userData.username,
      });
      if (!userExist) {
        await this.userRepo.save(userData);
        return {
          success: true,
          message: 'New user created.',
        };
      } else {
        throw new Error('username already exist');
      }
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async findUserById(userId: string): Promise<User> {
    return this.userRepo.findOne({ id: userId });
  }
}
