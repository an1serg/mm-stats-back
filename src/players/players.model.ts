import {Model, DataType, Table, Column, BelongsTo, HasMany} from "sequelize-typescript"
import { GameStats } from "src/game-stats/game-stats.model";



interface PlayersCreationAttrs {
    playerId: number;
    nickname: string;
}




@Table({tableName:'players'})
export class Player extends Model<Player, PlayersCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement:true})
    playerId: number;

    @Column({ type: DataType.STRING, unique: true})
    nickname: string;

    @HasMany(() => GameStats)
    stats: GameStats[];
}