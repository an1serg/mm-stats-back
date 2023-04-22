import { Body, Injectable, Post } from "@nestjs/common";
import { Sequelize } from "sequelize";
import { InjectModel } from "@nestjs/sequelize";
import { Game } from "./games.model";
import { AddGameDto } from "./dto/add-game.dto";
import { CreateGameStatsDto } from "src/game-stats/dto/create-game-stats.dto";
import { GameStats } from "src/game-stats/game-stats.model";
import { PlayersService } from "src/players/players.service";
import { CreatePlayerDto } from "src/players/dto/create-player.dto";
import { GameStatsService } from "src/game-stats/game-stats.service";
import { forEach } from "lodash";
import { Player } from "src/players/players.model";

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game) private gameRepository: typeof Game,
    @InjectModel(GameStats) private gameStatsRepository: typeof GameStats,
    private playersService: PlayersService,
    private gameStatsService: GameStatsService
  ) {}

  async addGame(addGameDto: AddGameDto) {
    const game = await Game.create({
      mapName: addGameDto.mapName,
      score: addGameDto.score,
    });

    const players = [];
    for (const stat of addGameDto.stats) {
      let player = await this.playersService.getPlayerByNickname(stat.nickname);
      if (!player) {
        player = await Player.create({ nickname: stat.nickname });
      }
      players.push({
        nickname: player.dataValues.nickname,
        playerId: player.dataValues.playerId,
      });
    }

    const gameStats = addGameDto.stats.map((stat, index) => ({
      kills: stat.kills,
      hs: stat.hs,
      kd: stat.kd,
      kr: +(
        stat.kills /
        addGameDto.score.split("-").reduce((a, b) => Number(a) + Number(b), 0)
      ).toFixed(1),
      playerId: players[index].playerId,
      nickname: players[index].nickname,
    }));

    for (const stats of gameStats) {
      await GameStats.create({
        ...stats,
        gameId: game.id,
      });
    }
  }

  async getAllGames() {
    const games = await this.gameRepository.findAll({
      order: [["id", "DESC"]],
    });
    return games;
  }

  async getGameById(id: number) {
    console.log(id);
    const game: AddGameDto = await this.gameRepository.findByPk(id);
    const stats: CreateGameStatsDto[] =
      await this.gameStatsService.getStatsByGameId(id);
    return {
      mapName: game.mapName,
      score: game.score,
      stats: stats,
    };
  }
}
