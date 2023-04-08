import { Module } from '@nestjs/common';
import { GameStatsService } from './game-stats.service';
import { GameStatsController } from './game-stats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from 'src/games/games.model';
import { GameStats } from './game-stats.model';
import { Player } from 'src/players/players.model';

@Module({
  providers: [GameStatsService],
  controllers: [GameStatsController],
  imports: [
    SequelizeModule.forFeature([Game, GameStats, Player])
  ]
})
export class GameStatsModule {}
