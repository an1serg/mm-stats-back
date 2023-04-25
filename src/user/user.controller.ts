import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/:id")
  async getUserGames(@Param("id") id: number) {
    return this.userService.getUserGames(id);
  }
}
