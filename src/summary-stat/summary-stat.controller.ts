import { Controller, Get, Post } from "@nestjs/common";
import { SummaryStatService } from "./summary-stat.service";

@Controller("summary-stat")
export class SummaryStatController {
  constructor(private summaryStatService: SummaryStatService) {}

  @Get()
  async getAll() {
    return this.summaryStatService.getStat();
  }

  @Post()
  async calcStat() {
    return this.summaryStatService.calculateStat();
  }
}
