import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { GamesModule } from "./games/games.module";
import { Game } from "./games/games.model";
import { GameStatsModule } from './game-stats/game-stats.module';
import { PlayersModule } from './players/players.module';
import { Player } from "./players/players.model";
import { GameStats } from "./game-stats/game-stats.model";
import { ConfigModule } from '@nestjs/config';

require('dotenv').config()

@Module({
    controllers: [],
    providers: [],
    imports:[
        SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: String(process.env.POSTGRES_PASSWORD),
        database: process.env.POSTGRES_DB,
        models: [Game, Player, GameStats],
        autoLoadModels: true
      }),
      GamesModule,
      PlayersModule,
      GameStatsModule,
    ],
})
export class AppModule {}