import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { AnimalService } from './animal.service';

  
  @Controller('animal')
  export class AnimalController {
    constructor(private readonly animal: AnimalService) {}
  
   
    @Post()
    async create(@Body() data: any) {
      console.log(data);
  
      return await this.animal.create(data);
    }
  
    @Get(":id")
    async show(@Param("id") id: string) {
      return await this.animal.show(id);
    }
  }
  