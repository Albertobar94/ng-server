import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsUUID } from "class-validator";

export class ParticipantsResponseDto {
  @ApiProperty()
  @IsUUID("4")
  readonly roomId: string;

  @ApiProperty()
  @IsUUID("4")
  readonly participant: string;

  @ApiProperty()
  @IsDateString()
  readonly createdAt: Date;

  @ApiProperty()
  @IsDateString()
  readonly deletedAt?: Date;

  @ApiProperty()
  @IsBoolean()
  readonly deleted: boolean;
}
