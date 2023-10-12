import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly user: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() data: UserDTO) {
    return await this.user.create(data);
  }

  @Get(":tipo")
  async findAll(@Param("tipo") tipo: string) {
    return await this.user.findAllByType(tipo);
  }

  @Get("interesse/:id/:animal_id")
  async interesse(
    @Param("id") id: string,
    @Param("animal_id") animal_id: string,
  ) {
    return await this.user.interesse(id, animal_id);
  }

  @Get("interesse/:user_id")
  async listAllInteresse(@Param("user_id") id: string) {
    return await this.user.listAllInteresseByUser(id);
  }

  @Delete("interesse/:id/:animal_id")
  async removeInteresse(
    @Param("id") id: string,
    @Param("animal_id") animal_id: string,
  ) {
    return this.user.removeInteresse(id, animal_id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.user.remove(id);
  }
}
