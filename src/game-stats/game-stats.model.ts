import {Model, DataType, Table, Column, BelongsTo, ForeignKey} from "sequelize-typescript"
import { Game } from "src/games/games.model";
import { Player } from "src/players/players.model";





interface GameStatsCreationAttrs {
    kills: number;
    adr: number;
    kr: number;
    ef: number;
    ud: number;
}




@Table({tableName:'game-stats'})
export class GameStats extends Model<GameStats, GameStatsCreationAttrs>{


    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true})
    id: number;

    @Column({ type: DataType.INTEGER, unique: false})
    kills: number;

    @Column({ type: DataType.INTEGER, unique: false})
    adr: number;
    
    @Column({ type: DataType.INTEGER, unique: false})
    kr: number;
    
    @Column({ type: DataType.INTEGER, unique: false})
    ef: number;

    @Column({ type: DataType.INTEGER, unique: false})
    ud: number;


    @ForeignKey(() => Game)
    @Column({type: DataType.INTEGER})
    gameId: number;

    @BelongsTo(() => Game)
    game: Game;

    @ForeignKey(() => Player)
    @Column({type: DataType.INTEGER})
    playerId: number;

    @BelongsTo(() => Player)
    player: Player[];
}