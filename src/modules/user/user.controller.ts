import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() data: UserDTO) {
    console.log(data);

    return await this.user.create(data);
  }

  @Get(':tipo')
  async findAll(@Param('tipo') tipo: string) {
    return await this.user.findAllByType(tipo);
  }
}
