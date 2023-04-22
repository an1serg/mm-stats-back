import {
  Model,
  DataType,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Game } from "src/games/games.model";
import { Player } from "src/players/players.model";

interface GameStatsCreationAttrs {
  nickname: string;
  kills: number;
  hs: number;
  kd: number;
  kr: number;
  playerId: number;
  gameId: number;
}

@Table({ tableName: "game-stats" })
export class GameStats extends Model<GameStats, GameStatsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.STRING, unique: false })
  nickname: string;

  @Column({ type: DataType.INTEGER, unique: false })
  kills: number;

  @Column({ type: DataType.INTEGER, unique: false })
  hs: number;

  @Column({ type: DataType.FLOAT, unique: false })
  kd: number;

  @Column({ type: DataType.FLOAT, unique: false })
  kr: number;

  @ForeignKey(() => Game)
  @Column({ type: DataType.INTEGER })
  gameId: number;

  @BelongsTo(() => Game)
  game: Game;

  @ForeignKey(() => Player)
  @Column({ type: DataType.INTEGER })
  playerId: number;

  @BelongsTo(() => Player)
  player: Player[];
}
