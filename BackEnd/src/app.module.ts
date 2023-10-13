import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { AnimalModule } from "./modules/animal/animal.module";
import { HomeModule } from "./modules/Home/home.module";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [UserModule, HomeModule, AuthModule, UserModule, AnimalModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: "login", method: RequestMethod.POST },
        { path: "user", method: RequestMethod.POST },
      )
      .forRoutes("");
  }
}
