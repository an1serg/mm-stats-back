import { Model, DataType, Table, Column } from "sequelize-typescript";

interface UserCreationAttrs {
  id: number;
  nickname: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  nickname: string;

  @Column({ type: DataType.STRING })
  password: string;
}
