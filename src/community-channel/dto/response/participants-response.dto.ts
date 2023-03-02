import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsUUID } from "class-validator";

export class ParticipantsResponseDto {
  @ApiProperty()
  @IsUUID("4")
  readonly roomId: string;

  @ApiProperty()
  @IsUUID("4")
  readonly participant: string;

  @ApiProperty()
  @IsDateString()
  readonly joinedAt: Date;

  @ApiProperty()
  @IsDateString()
  readonly leftAt?: Date;
}
