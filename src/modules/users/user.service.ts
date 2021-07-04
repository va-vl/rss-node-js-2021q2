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

  async getAll() {
    return this.userRepository.find();
  }

  async getById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDTO: CreateUserDTO) {
    return this.userRepository.save(this.userRepository.create(createUserDTO));
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    const user = await this.getById(id);

    if (user === undefined) {
      return user;
    }

    const newUser = this.userRepository.create({ ...user, ...updateUserDTO });
    return this.userRepository.save(newUser);
  }

  async remove(id: string) {
    const user = await this.getById(id);

    if (user === undefined) {
      return false;
    }

    await this.userRepository.remove(user);
    return true;
  }
}
