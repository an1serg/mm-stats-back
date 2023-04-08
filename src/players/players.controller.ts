import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('players')
export class PlayersController {

    constructor(private playersService: PlayersService) {}

    @Get()
    async getAll() {
        return this.playersService.getAllPlayers();
    }
    @Get()
    async getByNickname(nickname: string){
        return this.playersService.getPlayerByNickname(nickname)
    }

    @Post()
    async create(@Body() createPlayerDto: CreatePlayerDto){
        return this.playersService.addPlayer(createPlayerDto);
    }
}
