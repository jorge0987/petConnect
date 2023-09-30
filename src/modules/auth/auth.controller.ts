import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('instituicao')
  async loginInstituicao(@Body() body) {
    return this.authService.loginInstituicao(body);
  }
}
