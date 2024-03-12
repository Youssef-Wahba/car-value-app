import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('/auth')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    const user = await this.userService.deleteOneById(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  @Patch('/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.updateById(parseInt(id), updateUserDto);
    return user;
  }
}
