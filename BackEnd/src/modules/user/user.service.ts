import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user) {
    const data = {
      ...user,
      senha: await bcrypt.hash(user.senha, 10),
    };

    if (await this.showUserByEmail(user.email)) {
      throw new HttpException(
        "Já existe um cadastro com este e-mail!",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!data.cnpj) delete data.cnpj;
    if (!data.endereco) delete data.endereco;
    if (!data.historico) delete data.historico;
    if (!data.contato) delete data.contato;
    if (!data.foto) delete data.foto;
    else {
      data.foto = Buffer.from(data.foto, "base64");
    }

    if (data.tipo_usuario === "2") {
      if (!data.cnpj) {
        throw new HttpException(
          "Informe o CNPJ da instituição!",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        if (await this.showUserByCNPJ(user.cnpj)) {
          throw new HttpException(
            "Já existe uma Instituição com este CNPJ!",
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
    let userModel = null;
    try {
      userModel = await this.prisma.user.create({ data });
    } catch (e) {
      throw new HttpException(
        "Falha ao Cadastrar",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return userModel.id;
  }

  async show(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        cnpj: true,
        contato: true,
        endereco: true,
        nome: true,
        foto: true,
        historico: true,
      },
    });

    return {
      ...user,
      foto: user.foto
        ? "data:image/png;base64," + Buffer.from(user.foto).toString("base64")
        : null,
    };
  }

  async showUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }

  async showUserByCNPJ(cnpj: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        cnpj: cnpj,
      },
    });

    return user;
  }

  async findAllByType(type: string) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          tipo_usuario: type,
        },
        select: {
          id: true,
          cnpj: true,
          contato: true,
          endereco: true,
          nome: true,
          foto: true,
          historico: true,
        },
      });
      const newData: any = [];
      users.map((user: any) => {
        newData.push({
          ...user,
          foto: user.foto
            ? `data:image/png;base64,${Buffer.from(user.foto).toString(
                "base64",
              )}`
            : null,
        });
      });

      return newData;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async listInteresseByAnimal(animal_id: string) {
    return await this.prisma.interesse.findMany({
      where: {
        animal_id: animal_id,
      },
      include: {
        user: true,
      },
    });
  }

  async addInteresseInAnimal(id: string, animal_id: string) {
    const interesse = await this.prisma.interesse.findFirst({
      where: {
        user_id: id,
        animal_id: animal_id,
      },
    });

    if (!interesse) {
      try {
        return await this.prisma.interesse.create({
          data: { user_id: id, animal_id },
        });
      } catch (e) {
        throw new HttpException(
          "Falha ao cadastrar interesse!",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      await this.removeInteresse(id, animal_id, interesse.id);
    }
  }

  async listAllInteresseByUser(user_id: string) {
    try {
      return await this.prisma.interesse.findMany({
        where: {
          user_id: user_id,
        },
        include: {
          animal: true,
        },
      });
    } catch (e) {
      throw new HttpException(
        "Falha ao carregar intereses!",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeInteresse(id: string, animal_id: string, interese_id?: string) {
    let animal = null;
    let interesse = null;

    if (interese_id) {
      try {
        await this.prisma.interesse.delete({
          where: {
            id: interese_id,
          },
        });
        return true;
      } catch (error) {
        throw new HttpException(
          "Falha ao remover interese!",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    try {
      animal = await this.prisma.animal.findFirst({
        where: {
          id: animal_id,
        },
        include: {
          interesse: true,
        },
      });

      if (animal) {
        interesse = await this.prisma.interesse.findFirst({
          where: {
            OR: [{ AND: { user_id: id } }, { AND: { animal_id: animal.id } }],
          },
        });
      }

      if (interesse) {
        await this.prisma.interesse.delete({
          where: {
            id: interesse.id,
          },
        });
        return true;
      }
    } catch (error) {
      throw new HttpException(
        "Falha ao remover interese!",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!interesse || !animal) {
      throw new HttpException(
        "Falha ao remover interese!",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return true;
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
