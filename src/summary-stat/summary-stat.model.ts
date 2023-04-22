import { Model, DataType, Table, Column } from "sequelize-typescript";

interface SummaryStatCreationAttrs {
  nickname: string;
  mapsPlayed: number;
  avg: number;
  hs: number;
  kd: number;
  kr: number;
}

@Table({ tableName: "summary-stat" })
export class SummaryStat extends Model<SummaryStat, SummaryStatCreationAttrs> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  nickname: string;

  @Column({ type: DataType.INTEGER })
  mapsPlayed: number;

  @Column({ type: DataType.INTEGER })
  avg: number;

  @Column({ type: DataType.INTEGER })
  hs: number;

  @Column({ type: DataType.FLOAT })
  kd: number;

  @Column({ type: DataType.FLOAT })
  kr: number;
}
