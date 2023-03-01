import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsString, IsUUID } from "class-validator";

export class ParticipantsDto {
  @ApiProperty()
  @IsUUID("4")
  readonly roomId: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly participants: ReadonlyArray<string>;
}
