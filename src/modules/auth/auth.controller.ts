import { Controller, Post, UseGuards, Request, Inject } from '@nestjs/common';
//
import { LocalGuard } from 'src/guards/local.guard';
import { AuthService } from './auth.service';
import { RequestWithUser } from './input/request-with-user.input';

@Controller('login')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseGuards(LocalGuard)
  async login(@Request() req: RequestWithUser) {
    return {
      token: this.authService.getTokenForUser(req.user),
    };
  }
}
