import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization)
      return res.json({ message: "Você deve efetuar login" });

    const [, token] = req.headers.authorization.split(" ");

    try {
      await jwt.verify(token, process.env.JWT_SECRET);

      next();
    } catch (error) {
      return res.json({ message: "Sessão expirada" });
    }
  }
}
