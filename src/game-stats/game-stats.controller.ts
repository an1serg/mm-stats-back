import { Body, Controller, Post } from '@nestjs/common';
import { GameStatsService } from './game-stats.service';
import { CreateGameStatsDto } from './dto/create-game-stats.dto';
import { Transaction } from 'sequelize';

@Controller('game-stats')
export class GameStatsController {
    constructor(private gameStatsService: GameStatsService) {}

    @Post()
    createGame(@Body() createGameStatsDto: CreateGameStatsDto) {
        return this.gameStatsService.addGameStats(createGameStatsDto);
    }
}
