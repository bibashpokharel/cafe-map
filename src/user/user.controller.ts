import { Body, Controller, Post } from '@nestjs/common';
import { CreateNewEntry } from 'src/utils/createNew.response';
import { NewUserDto } from './dto/newUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async createUser(@Body() body: NewUserDto): Promise<CreateNewEntry> {
    return this.userService.createNewUser(body);
  }
}
