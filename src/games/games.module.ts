import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './games.model';
import { GameStats } from 'src/game-stats/game-stats.model';
import { Player } from 'src/players/players.model';
import { PlayersService } from 'src/players/players.service';
import { GameStatsService } from 'src/game-stats/game-stats.service';
import { PlayersModule } from 'src/players/players.module';

@Module({
  controllers: [GamesController],
  providers: [GamesService, PlayersService, GameStatsService],
  imports: [
    SequelizeModule.forFeature([Game, Player, GameStats])
  ]
})
export class GamesModule {}
