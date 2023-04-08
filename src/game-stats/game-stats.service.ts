import { Injectable } from '@nestjs/common';
import { GameStats } from './game-stats.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGameStatsDto } from './dto/create-game-stats.dto';
import { Transaction } from 'sequelize';

@Injectable()
export class GameStatsService {
    constructor(@InjectModel(GameStats) private gameStatsRepository: typeof GameStats) {}

    async addGameStats (createGameStatsDto: CreateGameStatsDto){
        const gameStats = await this.gameStatsRepository.create(createGameStatsDto);
        return gameStats;
    }
}
