import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
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
      throw new ForbiddenException();
    }

    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || token === undefined) {
      throw new ForbiddenException();
    }

    this.jwtService.verify(token);

    return true;
  }
}
