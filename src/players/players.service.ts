import { Injectable } from '@nestjs/common';
import { Player } from './players.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayersService {

    constructor(@InjectModel(Player) private playerRepository: typeof Player) {}


    async getAllPlayers() {
        const players = await this.playerRepository.findAll();
        return players;
    }

    async getPlayerByNickname(nickname: string){
        const player = this.playerRepository.findOne({where: {nickname}})
        return player;
    }

    async addPlayer(createPlayerDto: CreatePlayerDto) {
        const player = this.playerRepository.create(createPlayerDto);
        return player;
    }

}
