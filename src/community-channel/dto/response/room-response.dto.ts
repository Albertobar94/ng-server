import { ApiProperty } from "@nestjs/swagger";
import { ParticipantsResponseDto } from "./participants-response.dto";
import { IsArray } from "class-validator";

export class RoomResponseDto {
  @ApiProperty()
  readonly id: string;

  @IsArray()
  @ApiProperty({ type: () => ParticipantsResponseDto, isArray: true })
  readonly participants: ReadonlyArray<ParticipantsResponseDto>;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;
}
