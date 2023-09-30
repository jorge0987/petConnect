import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcrypt';

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
        'Já existe um cadastro com este e-mail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!data.cnpj) delete data.cnpj;
    if (!data.endereco) delete data.endereco;
    if (!data.historico) delete data.historico;

    if (data.tipo_usuario === '2') {
      if (!data.cnpj) {
        throw new HttpException(
          'Informe o CNPJ da instituição!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        if (await this.showUserByCNPJ(user.cnpj)) {
          throw new HttpException(
            'Já existe uma Instituição com este CNPJ!',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }

    try {
      await this.prisma.user.create({ data });
    } catch (e) {
      console.log(e);

      throw new HttpException(
        'Falha ao Cadastrar',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return true;
  }

  async show(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    return user;
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
    return await this.prisma.user.findMany({
      where: {
        tipo_usuario: type,
      },
    });
  }
}
