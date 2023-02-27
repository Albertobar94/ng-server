import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "./repository/user.repository";

@Controller("user")
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  /* -------------------------------------------------------------------------- */
  /*                               Get User By Id                               */
  /* -------------------------------------------------------------------------- */
  @ApiTags("User")
  @ApiOkResponse({
    description: "The record has been successfully fetched.",
    type: [UserEntity],
  })
  @Get(":id")
  async getUser(@Param("id") id: UserEntity["id"]) {
    const user = await this.userRepository.selectById(id);

    return {
      user,
    };
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Create User                                */
  /* -------------------------------------------------------------------------- */
  @ApiTags("User")
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: [UserEntity],
  })
  @HttpCode(201)
  @Post()
  async postUser(@Body() user: CreateUserDto): Promise<UserEntity> {
    const entity = UserEntity.create(user);
    return this.userRepository.insert(entity);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Update User                                */
  /* -------------------------------------------------------------------------- */
  @ApiTags("User")
  @ApiOkResponse({
    description: "The record has been successfully updated.",
    type: [UserEntity],
  })
  @Put()
  async putUser(@Body() user: UpdateUserDto): Promise<UserEntity> {
    const entity = UserEntity.update(user);
    return this.userRepository.upsert(entity);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Delete User                                */
  /* -------------------------------------------------------------------------- */
  @ApiTags("User")
  @ApiNoContentResponse({
    description: "The record has been successfully deleted.",
  })
  @HttpCode(204)
  @Delete("/:id")
  async deleteUser(@Param("id") id: UserEntity["id"]): Promise<void> {
    await this.userRepository.remove(id);

    return;
  }
}
