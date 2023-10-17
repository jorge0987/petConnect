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

      data.adotado = false;

      animal = await this.prisma.animal.create({ data });

      for (const foto of fotos) {
        const foto_create: any = {
          animal_id: animal.id,
          arquivo: Buffer.from(foto, "base64"),
        };

        try {
          await this.prisma.foto.create({ data: foto_create });
        } catch (e) {
          throw new HttpException(
            "Falha ao Cadastrar",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    } catch (e) {
      throw new HttpException(
        "Falha ao Cadastrar animal",
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

    const fotos = user.fotos;
    const fotos_formated = [];
    for (const foto of fotos) {
      fotos_formated.push({ ...foto, arquivo: foto.arquivo.toString("utf-8") });
    }
    delete user.fotos;
    user.fotos = fotos_formated;

    return user;
  }

  async listAllByUser(userId: string) {
    const institution: any = this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (!institution) {
      throw new HttpException(
        "Falha ao carregar animais",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const result: any = await this.prisma.animal.findMany({
      where: {
        user_id: userId,
      },
      include: {
        fotos: true,
        interesse: true,
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
            endereco: true,
            contato: true,
            historico: true,
            foto: true,
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
    });

    for (const animal of result) {
      const fotosFormat: any = [];

      if (animal.interesse) {
        for (const interesse of animal.interesse) {
          if (interesse.user_id === userId) {
            animal.interesseActive = true;
          }
        }
      }
      if (institution.tipo_usuario === "1") delete animal.interesse;

      if (animal.user.foto) {
        animal.user.foto =
          "data:image/png;base64," +
          Buffer.from(animal.user.foto)
            .toString("base64")
            .replace("dataimage/jpegbase64", "");
      }

      for (const foto of animal.fotos) {
        fotosFormat.push({
          ...foto,
          arquivo:
            "data:image/png;base64," +
            Buffer.from(foto.arquivo)
              .toString("base64")
              .replace("dataimage/jpegbase64", ""),
        });
      }
      animal.fotos = [...fotosFormat];
    }

    return result;
  }

  async listAll(skip: number, take: number, userId: string) {
    const lines = await this.prisma.animal.count({
      where: {
        adotado: false,
      },
    });

    const result: any = await this.prisma.animal.findMany({
      skip: Number(skip),
      take: Number(take),
      where: {
        adotado: false,
      },
      include: {
        fotos: true,
        interesse: true,
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
            endereco: true,
            contato: true,
            historico: true,
            foto: true,
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
    });

    for (const animal of result) {
      if (animal.interesse) {
        for (const interesse of animal.interesse) {
          if (interesse.user_id === userId) {
            animal.interesseActive = true;
          }
        }
      }
      delete animal.interesse;

      if (animal.user.foto) {
        animal.user.foto =
          "data:image/png;base64," +
          Buffer.from(animal.user.foto)
            .toString("base64")
            .replace("dataimage/pngbase64", "")
            .replace("dataimage/jpegbase64", "");
      }

      const fotosFormat: any = [];
      for (const foto of animal.fotos) {
        fotosFormat.push({
          ...foto,
          arquivo:
            "data:image/png;base64," +
            Buffer.from(foto.arquivo)
              .toString("base64")
              .replace("dataimage/jpegbase64", ""),
        });
      }
      animal.fotos = [...fotosFormat];
    }

    return { lines, result };
  }

  async adotarAnimal(animalId: string) {
    return await this.prisma.animal.update({
      data: { adotado: true },
      where: {
        id: animalId,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.animal.delete({ where: { id: String(id) } });
  }
}
