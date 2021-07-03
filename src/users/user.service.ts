import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { User } from './entities/user.entity';
import { CreateUserDTO } from './input/create-user.dto';
import { UpdateUserDTO } from './input/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async getAll() {
    return this.userRepository.find();
  }

  public async getById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  public async create(createUserDTO: CreateUserDTO) {
    return this.userRepository.save(this.userRepository.create(createUserDTO));
  }

  public async update(id: string, updateUserDTO: UpdateUserDTO) {
    const user = await this.getById(id);
    return user && this.userRepository.save({ ...user, ...updateUserDTO });
  }

  public async remove(id: string) {
    const user = await this.getById(id);

    if (user) {
      await this.userRepository.remove(user);
      return true;
    }

    return false;
  }
}
