import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString, IsUUID } from "class-validator";

export class UserResponseDto {
  @ApiProperty()
  @IsUUID("4")
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsDateString()
  readonly createdAt: Date;

  @ApiProperty()
  @IsDateString()
  readonly updatedAt: Date;
}
