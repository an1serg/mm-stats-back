import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { PlayersService } from "src/players/players.service";
import { GameStatsService } from "src/game-stats/game-stats.service";
import { GamesService } from "src/games/games.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private playersService: PlayersService,
    private gameStatsService: GameStatsService,
    private gameService: GamesService
  ) {}

  async getUserGames(id: number) {
    const user = await this.validateUser(id);
    console.log(user.nickname);
    const player = await this.playersService.getPlayerByNickname(user.nickname);
    console.log(player);
    if (!player) throw new Error("Player not found");

    const playerGameStats = await this.gameStatsService.getStatsByPlayerId(
      player.playerId
    );

    const gameList = [];
    for (const stats of playerGameStats) {
      gameList.push(await this.gameService.getGameById(stats.gameId));
    }

    return gameList;
  }

  private validateUser(id: number) {
    const user = this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) throw new Error("User not found");

    return user;
  }
}
