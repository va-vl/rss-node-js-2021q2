import { Controller, Post, UseGuards, Request, Inject } from '@nestjs/common';
//
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RequestWithUser } from './input/request-with-user.input';

@Controller('login')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: RequestWithUser) {
    const token = this.authService.getTokenForUser(req.user);
    return { token };
  }
}
