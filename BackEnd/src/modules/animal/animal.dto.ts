import { Type } from "class-transformer";
import { IsString, IsNumber, IsArray, ValidateNested } from "class-validator";
class PhotoDto {
  @IsString()
  readonly originalname: string;

  @IsString()
  readonly filename: string;
}
export class CreateAnimalDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotoDto)
  readonly photos: PhotoDto[];
}
