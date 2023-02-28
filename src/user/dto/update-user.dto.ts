import { IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { UserInterface } from "../interface/user.interface";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements Omit<UserInterface, "createdAt" | "updatedAt">
{
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}
