import { CreateGameStatsDto } from "src/game-stats/dto/create-game-stats.dto";

export class AddGameDto{
    readonly mapName: string;
    readonly score: string;

    stats: CreateGameStatsDto[];
}