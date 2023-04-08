import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameStats } from 'src/game-stats/game-stats.model';
import { Player } from './players.model';

@Module({
  providers: [PlayersService],
  controllers: [PlayersController],
  imports: [
      SequelizeModule.forFeature([Player, GameStats])
  ]
})
export class PlayersModule {}
