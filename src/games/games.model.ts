import {Model, DataType, Table, Column, HasMany, ForeignKey} from "sequelize-typescript"
import { GameStats } from "src/game-stats/game-stats.model";



interface GameCreationAttrs {
    mapName: string;
    score: string;
}




@Table({tableName:'games'})
export class Game extends Model<Game, GameCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement:true})
    id: number;

    @Column({ type: DataType.STRING, unique: false})
    mapName: string;

    @Column({ type: DataType.STRING, unique: false})
    score: string;

    @HasMany(() => GameStats)
    stats: GameStats[];
}