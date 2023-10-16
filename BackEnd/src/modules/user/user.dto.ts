import {
  IsByteLength,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from "class-validator";
import { CnpjValidator } from "src/validations/cnpj.validation";

export class UserDTO {
  @IsNotEmpty({ message: "Você deve informar um Nome." })
  @IsString({
    message: "Formato Inválido. O campo Nome esperava uma cadeia de caracteres",
  })
  nome: string;

  @IsNotEmpty({ message: "Tipo de Pessoa não definido" })
  tipo_usuario: string;

  @IsOptional()
  @IsString({
    message: "Formato Inválido. O campo CNPJ esperava uma cadeia de caracteres",
  })
  @Validate(CnpjValidator, { message: "CNPJ Inválido." })
  cnpj: string;

  @IsOptional()
  @IsString({
    message:
      "Formato Inválido. O campo Telefone esperava uma cadeia de caracteres",
  })
  endereco: string;

  @IsOptional()
  @IsString({
    message:
      "Formato Inválido. O campo Telefone esperava uma cadeia de caracteres",
  })
  contato: string;

  @IsOptional()
  @IsString({
    message:
      "Formato Inválido. O campo Telefone esperava uma cadeia de caracteres",
  })
  historico: string;

  @IsOptional()
  foto: any;

  @IsNotEmpty()
  @IsString({
    message:
      "Formato Inválido. O campo Email esperava uma cadeia de caracteres",
  })
  @IsEmail({}, { message: "Digite um Email Válido." })
  email: string;

  @IsNotEmpty()
  @IsString({
    message:
      "Formato Inválido. O campo Email esperava uma cadeia de caracteres",
  })
  senha: string;
}
