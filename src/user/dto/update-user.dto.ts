import { IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { UserInterface } from "../interface/user.interface";

export class UpdateUserDto
  extends PartialType(CreateUserDto)
  implements UserInterface
{
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
