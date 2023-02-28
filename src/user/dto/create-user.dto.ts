import { IsString } from "class-validator";
import { UserInterface } from "./../interface/user.interface";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto
  implements Omit<UserInterface, "id" | "createdAt" | "updatedAt">
{
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}
