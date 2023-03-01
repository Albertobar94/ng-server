import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsString, IsUUID } from "class-validator";
import { MESSAGE_CONTENT_TYPE } from "../../../shared/constants";
export class MessageResponseDto {
  @ApiProperty()
  @IsUUID("4")
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly type: "message";

  @ApiProperty()
  @IsString()
  readonly value: string;

  @ApiProperty({ enum: MESSAGE_CONTENT_TYPE })
  @IsEnum(MESSAGE_CONTENT_TYPE)
  readonly contentType: MESSAGE_CONTENT_TYPE;

  @ApiProperty()
  @IsUUID("4")
  readonly roomId: string;

  @ApiProperty()
  @IsUUID("4")
  readonly userId: string;

  @ApiProperty()
  @IsDateString()
  readonly createdAt: string;

  @ApiProperty()
  @IsDateString()
  readonly updatedAt: string;
}
