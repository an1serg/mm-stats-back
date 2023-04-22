import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SummaryStat } from "./summary-stat.model";
import { CreateGameStatsDto } from "src/game-stats/dto/create-game-stats.dto";
import { CreatePlayerDto } from "src/players/dto/create-player.dto";
import { SummaryStatDto } from "./dto/summary-stat.dto";
import Query from "mysql2/typings/mysql/lib/protocol/sequences/Query";
import { PlayersService } from "src/players/players.service";
import { QueryTypes } from "sequelize";

@Injectable()
export class SummaryStatService {
  constructor(
    @InjectModel(SummaryStat) private summaryStatRepository: typeof SummaryStat,
    private playersService: PlayersService
  ) {}

  async getStat() {
    const stat = await this.summaryStatRepository.findAll();
    return stat;
  }

  async calculateStat() {
    const players: CreatePlayerDto[] =
      await this.playersService.getAllPlayers();
    const totalStat: SummaryStatDto[] = [];

    for (const player of players) {
      let id = player.playerId;
      let nickname = player.nickname;

      let mapPlayed = await this.summaryStatRepository.sequelize.query(
        `
      SELECT COUNT(*)
      as "mapsPlayed"
      FROM public."game-stats"
      WHERE "playerId" = ${id};
      `,
        { type: QueryTypes.SELECT }
      );

      const avg = await this.summaryStatRepository.sequelize.query(
        `SELECT ROUND(AVG(kills))
        as "avg"
        FROM public."game-stats"
        WHERE "playerId" = ${id};`,
        { type: QueryTypes.SELECT }
      );

      const hs = await this.summaryStatRepository.sequelize.query(
        `SELECT ROUND(AVG(hs))
        as "hs"
        FROM public."game-stats"
        WHERE "playerId" = ${id};`,
        { type: QueryTypes.SELECT }
      );

      let kd = await this.summaryStatRepository.sequelize.query(
        `SELECT ROUND(AVG(kd)::numeric, 2)
        as "kd"
        FROM public."game-stats"
        WHERE "playerId" = ${id};`,
        { type: QueryTypes.SELECT }
      );

      let kr = await this.summaryStatRepository.sequelize.query(
        `SELECT ROUND(AVG(kr)::numeric, 2)
        as "kr"
        FROM public."game-stats"
        WHERE "playerId" = ${id};`,
        { type: QueryTypes.SELECT }
      );

      totalStat.push(
        Object.assign({ nickname }, ...mapPlayed, ...avg, ...hs, ...kd, ...kr)
      );
    }
    for (const playerStat of totalStat) {
      const playerSummaryStat = await this.summaryStatRepository.findByPk(
        playerStat.nickname
      );
      if (!playerSummaryStat) {
        await this.summaryStatRepository.create(playerStat);
      } else {
        await this.summaryStatRepository.update(playerStat, {
          where: { nickname: playerStat.nickname },
        });
      }
    }
  }
}
