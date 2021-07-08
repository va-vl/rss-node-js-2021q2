import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
//
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './input/create-user.dto';
import { UpdateUserDTO } from './input/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  async getAll() {
    return this.userRepository.find();
  }

  async getById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUserDTO: CreateUserDTO) {
    const user = new User();
    user.name = createUserDTO.name;
    user.login = createUserDTO.login;

    const { JWT_SALT_ROUNDS } = this.configService.get('config');
    user.password = await bcrypt.hash(createUserDTO.password, JWT_SALT_ROUNDS);

    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDTO: UpdateUserDTO) {
    const user = await this.getById(id);

    if (user === undefined) {
      return user;
    }

    const { JWT_SALT_ROUNDS } = this.configService.get('config');
    const newUser = this.userRepository.create({
      ...user,
      ...updateUserDTO,
      password:
        updateUserDTO.password === undefined
          ? user.password
          : await bcrypt.hash(updateUserDTO.password, JWT_SALT_ROUNDS),
    });

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
