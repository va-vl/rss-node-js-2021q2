import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const {
      headers: { authorization },
    } = ctx.getRequest();

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || token === undefined) {
      throw new UnauthorizedException();
    }

    this.jwtService.verify(token);

    return true;
  }
}
