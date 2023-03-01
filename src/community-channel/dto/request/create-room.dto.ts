import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsString } from "class-validator";

export class CreateRoomDto {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  readonly participants: ReadonlyArray<string>;
}
