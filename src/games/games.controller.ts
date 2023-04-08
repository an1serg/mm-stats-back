import { Body, Controller, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { AddGameDto } from './dto/add-game.dto';
import { CreateGameStatsDto } from 'src/game-stats/dto/create-game-stats.dto';

@Controller('games')
export class GamesController {

    constructor(private gamesService: GamesService) {}

    // @Post()
    // create(@Body() gameDto: AddGameDto, statsDto: CreateGameStatsDto[]) {
    //     return this.gamesService.addGameWithStats(gameDto, statsDto);
    // }
}
