import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "./../shared/decorators/api-response.decorator";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PageDto } from "src/shared/dto/page.dto";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/request/create-user.dto";
import { UserRepository } from "./repository/user.repository";
import { UserResponseDto } from "./dto/response/user-response.dto";

@Controller("user")
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  /* ----------------------------- Get User By Id ----------------------------- */

  @ApiTags("User")
  @ApiResponse(UserResponseDto, StatusCodes.OK)
  @Get(":id")
  async getUser(
    @Param("id") id: UserEntity["id"],
  ): Promise<PageDto<UserEntity>> {
    const user = await this.userRepository
      .createQueryBuilder()
      .where({ id })
      .getOne();

    return new PageDto(new Array(user), null);
  }

  /* ------------------------------- Create User ------------------------------ */

  @ApiTags("User")
  @ApiResponse(UserResponseDto, StatusCodes.CREATED)
  @HttpCode(StatusCodes.CREATED)
  @Post()
  async postUser(
    @Body() userDto: CreateUserDto,
  ): Promise<PageDto<CreateUserDto>> {
    const entity = new UserEntity(
      userDto.firstName,
      userDto.lastName,
    ).setCreated();
    const user = await this.userRepository.save(entity);

    return new PageDto(new Array(user), null);
  }
}
