import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
//
import { User } from 'src/modules/users/entities/user.entity';
import { JwtPayload } from '../input/jwt-payload.input';
import { config } from '../../../common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config().JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    return await this.userRepository.findOne({
      where: {
        id: payload.userId,
        login: payload.login,
      },
    });
  }
}
