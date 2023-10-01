import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { foto } from "@prisma/client";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class AnimalService {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    let animal = null;
    try {
      const fotos: Array<any> = data.fotos || [];
      delete data.fotos;

      animal = await this.prisma.animal.create({ data });
      for (let foto of fotos) {
        foto.animal_id = animal.id;

        try {
          await this.prisma.foto.create({ data: foto });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);

      throw new HttpException(
        "Falha ao Cadastrar",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return animal;
  }

  async show(id: string) {
    const user = await this.prisma.animal.findFirst({
      where: {
        id: id,
      },
      include: {
        fotos: true,
        interesse: {
            include: {
              user: {
                select: {
                  // Selecione apenas os campos desejados, excluindo a senha
                  id: true,
                  nome: true,
                  email: true,
                  // Outros campos que você deseja incluir
                },
              },
            },
          },
      },
    });

    return user;
  }

  async findAll() {
    return await this.prisma.animal.findMany();
  }
}
