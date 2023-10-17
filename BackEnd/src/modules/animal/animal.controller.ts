import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { AnimalService } from "./animal.service";

@Controller("animal")
export class AnimalController {
  constructor(private readonly animal: AnimalService) {}

  @Post()
  async create(@Body() form: any) {
    return await this.animal.create(form);
  }

  @Get(":id")
  async show(@Param("id") id: string) {
    return await this.animal.show(id);
  }

  @Get("user/:id")
  async listAllByUser(@Param("id") id: string) {
    return await this.animal.listAllByUser(id);
  }
  @Get("adotar/:animalId")
  async adotarAnimal(@Param("animalId") animalId: string) {
    return await this.animal.adotarAnimal(animalId);
  }

  @Get("feed/:userId")
  async listAll(
    @Param("userId") userId: string,
    @Query("skip") skip: number,
    @Query("take") take: number,
  ) {
    return await this.animal.listAll(skip, take, userId);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: any) {
    return { id, data };
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.animal.remove(id);
  }
}
