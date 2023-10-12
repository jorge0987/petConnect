import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AnimalService } from "./animal.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateAnimalDto } from "./animal.dto";

@Controller("animal")
export class AnimalController {
  constructor(private readonly animal: AnimalService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: "fotos", maxCount: 4 }]))
  async create(
    @UploadedFiles()
    data,
    @Body() form: any,
  ) {
    form.fotos = data.fotos || [];

    return await this.animal.create(form);
  }

  @Get(":id")
  async show(@Param("id") id: string) {
    return await this.animal.show(id);
  }

  @Get()
  async listAll(@Query("skip") skip: number, @Query("take") take: number) {
    return await this.animal.listAll(skip, take);
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
