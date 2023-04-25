import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/user/user.model";
import { hash, verify } from "argon2";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwt: JwtService
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException("Invalid refresh token");

    const user = await this.userRepository.findOne({
      where: {
        id: result.id,
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userRepository.findOne({
      where: {
        nickname: dto.nickname,
      },
    });

    if (oldUser) throw new Error("User already exists");

    const user = await this.userRepository.create({
      nickname: dto.nickname,
      password: await hash(dto.password),
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async issueTokens(userId: number) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: "1h",
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      nickname: user.nickname,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        nickname: dto.nickname,
      },
    });

    if (!user) throw new Error("User not found");

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException("Invalid password");

    return user;
  }
}
