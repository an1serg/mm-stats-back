import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { Player } from "src/players/players.model";
import { GameStats } from "src/game-stats/game-stats.model";
import { PlayersService } from "src/players/players.service";
import { GameStatsService } from "src/game-stats/game-stats.service";
import { GamesService } from "src/games/games.service";
import { Game } from "src/games/games.model";

@Module({
  controllers: [UserController],
  providers: [UserService, PlayersService, GameStatsService, GamesService],
  imports: [SequelizeModule.forFeature([User, Player, GameStats, Game])],
})
export class UserModule {}
