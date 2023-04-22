import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import { GamesService } from "./games.service";
import { AddGameDto } from "./dto/add-game.dto";
import { CreateGameStatsDto } from "src/game-stats/dto/create-game-stats.dto";

@Controller("games")
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post("add")
  @Header("Content-Type", "application/json")
  async addGame(@Body() addGameDto: AddGameDto) {
    return this.gamesService.addGame(addGameDto);
  }

  @Get()
  async getAll() {
    return this.gamesService.getAllGames();
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    return this.gamesService.getGameById(id);
  }
}
