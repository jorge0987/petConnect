import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AnimalService } from "./animal.service";

@Controller("animal")
export class AnimalController {
  constructor(private readonly animal: AnimalService) {}

  @Post()
  async create(@Body() data: any) {
    return await this.animal.create(data);
  }

  @Get(":id")
  async show(@Param("id") id: string) {
    return await this.animal.show(id);
  }

  @Get()
  async listAll(@Query("skip") skip: number, @Query("take") take: number) {
    return await this.animal.listAll(skip, take);
  }

  @Delete(":id")
  async remove(@Param() id: string) {
    return await this.animal.remove(id);
  }
}
