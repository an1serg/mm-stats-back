import { Body, Injectable, Post } from '@nestjs/common';
import {Sequelize} from "sequelize"
import { InjectModel } from '@nestjs/sequelize';
import { Game } from './games.model';
import { AddGameDto } from './dto/add-game.dto';
import { CreateGameStatsDto } from 'src/game-stats/dto/create-game-stats.dto';
import { GameStats } from 'src/game-stats/game-stats.model';
import { PlayersService } from 'src/players/players.service';
import { CreatePlayerDto } from 'src/players/dto/create-player.dto';
import { GameStatsService } from 'src/game-stats/game-stats.service';

@Injectable()
export class GamesService {

    constructor(@InjectModel(Game) private gameRepository: typeof Game,
                @InjectModel(GameStats) private gameStatsRepository: typeof GameStats,
                private playersService: PlayersService,
                private gameStatsService: GameStatsService,
                ) {}

    // async addGameWithStats(gameDto: AddGameDto, statsDtos: CreateGameStatsDto[]) {


    //    // const transaction = await this.sequelize.transaction();


    //     try{
    //         let player = await this.playersService.getPlayerByNickname(statsDtos[0].nickname)
    //         if(!player) {
    //             const createPlayerDto: CreatePlayerDto = {nickname : statsDtos[0].nickname};
    //             player = await this.playersService.addPlayer(createPlayerDto);
    //         }

    //         const gameData = {...AddGameDto, playerId: player.id};
    //         const game = await this.gameRepository.create(gameData)


    //         const statsPromises = statsDtos.map((statsDto) => {
    //             const statsData = {...statsDto, gameId: game.id, playerId: player.id};
    //             return this.gameStatsService.addGameStats(statsData)
    //         })

    //         const gameStats = await Promise.all(statsPromises);

    //        // await transaction.commit();

    //         return game.reload({include: [{model: GameStats}]})

    //     }catch(error){

    //        // await transaction.rollback();
    //         throw error;
    //     }
    // }
}
