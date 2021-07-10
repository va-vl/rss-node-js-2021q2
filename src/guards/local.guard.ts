import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
//
import { User } from '../modules/users/entities/user.entity';

@Injectable()
export class LocalGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { login, password } = request.body;
    const user = await this.userRepository.findOne({ where: { login } });

    if (!user || user.login === undefined || user.password === undefined) {
      throw new UnauthorizedException();
    }

    const isMatching = await bcrypt.compare(password, user.password);

    if (!isMatching) {
      throw new UnauthorizedException();
    }

    request.user = user;

    return true;
  }
}
