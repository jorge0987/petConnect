import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";

@Injectable()
export class AnimalService {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    let animal = null;
    try {
      const fotos: Array<any> = data.fotos;
      delete data.fotos;

      const user = await this.prisma.user.findFirst({
        where: { id: data.user_id },
      });

      if (user && user.tipo_usuario === "1") {
        throw new HttpException(
          "Adotante não pode cadastrar animais!",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      animal = await this.prisma.animal.create({ data });

      for (const foto of fotos) {
        foto.animal_id = animal.id;

        try {
          await this.prisma.foto.create({ data: foto });
        } catch (e) {
          throw new HttpException(
            "Falha ao Cadastrar",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    } catch (e) {
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
                id: true,
                nome: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return user;
  }

  async listAll(skip: number, take: number) {
    const lines = await this.prisma.animal.count({
      where: {
        adotado: false,
      },
    });

    const result = await this.prisma.animal.findMany({
      skip: Number(skip),
      take: Number(take),
      where: {
        adotado: false,
      },
      include: {
        fotos: true,
        interesse: true,
        user: true,
      },
      orderBy: {
        updated_at: "desc",
      },
    });
    return { lines, result };
  }

  async remove(id: string) {
    return await this.prisma.animal.delete({ where: { id } });
  }
}
