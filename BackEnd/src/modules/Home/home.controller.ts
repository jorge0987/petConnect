import { Controller, Get } from "@nestjs/common";

@Controller("home")
export class HomeController {
  @Get()
  async getValidToken() {
    return true;
  }
}
