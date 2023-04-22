export class CreateGameStatsDto {
  readonly nickname: string;
  readonly gameId: number;
  readonly playerId: number;
  readonly kills: number;
  readonly kd: number;
  readonly hs: number;
  readonly kr: number;
}
