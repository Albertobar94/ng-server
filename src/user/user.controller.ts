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
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
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
  async postUser(@Body() data: CreateUserDto) {
    const entity = UserEntity.create(data);
    const user = await this.userRepository.insert(entity);

    return {
      user,
    };
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
  async putUser(@Body() data: UpdateUserDto) {
    const entity = UserEntity.update(data);
    const user = await this.userRepository.upsert(entity);

    return {
      user,
    };
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
  async deleteUser(@Param("id") id: UserEntity["id"]) {
    const entity = UserEntity.setId(id);
    await this.userRepository.remove(entity);

    return;
  }
}
