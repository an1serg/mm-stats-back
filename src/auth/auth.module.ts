import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getJwtConfig } from "config/jwt.config";
import { JwtStrategy } from "./jwt.strategy";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/user/user.model";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    SequelizeModule.forFeature([User]),
  ],
})
export class AuthModule {}
