import { IsString } from "class-validator";
import { UserInterface } from "./../interface/user.interface";
export class CreateUserDto implements UserInterface {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
