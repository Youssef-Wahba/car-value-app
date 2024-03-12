import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}
  create(user: CreateUserDto) {
    return this.usersRepo.save(this.usersRepo.create(user));
  }
  findById(id: number) {
    return this.usersRepo.findOneBy({ id });
  }
  async updateById(id: number, user: UpdateUserDto) {
    const checkUser = await this.usersRepo.findOneBy({ id });
    if (!checkUser) throw new NotFoundException('user not found');
    Object.assign(checkUser, user);
    return this.usersRepo.save(checkUser);
  }

  async deleteOneById(id: number) {
    const checkUser = await this.usersRepo.findOneBy({ id });
    if (!checkUser) throw new NotFoundException('user not found');
    return this.usersRepo.remove(checkUser);
  }
}
