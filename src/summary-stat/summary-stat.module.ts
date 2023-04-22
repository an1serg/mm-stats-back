import { Module } from "@nestjs/common";
import { SummaryStatService } from "./summary-stat.service";
import { SummaryStatController } from "./summary-stat.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { GameStats } from "src/game-stats/game-stats.model";
import { Player } from "src/players/players.model";
import { PlayersService } from "src/players/players.service";
import { GameStatsService } from "src/game-stats/game-stats.service";
import { SummaryStat } from "./summary-stat.model";

@Module({
  providers: [SummaryStatService, PlayersService, GameStatsService],
  controllers: [SummaryStatController],
  imports: [SequelizeModule.forFeature([Player, GameStats, SummaryStat])],
})
export class SummaryStatModule {}
