import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/PrismaService";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(body) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!(await bcrypt.compare(body.senha, user.senha))) {
        return "login ou senha incorreto";
      }
    } else {
      return "falha no login";
    }

    const payload = {
      id: user.id,
      acess_level: user.email,
    };

    return {
      token: this.jwtService.sign(payload),
      id: user.id,
      tipo_usuario: user.tipo_usuario,
    };
  }
}
