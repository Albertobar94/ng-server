import { IsEnum, IsString, IsUUID } from "class-validator";
import { MESSAGE_CONTENT_TYPE } from "../../../shared/constants";
import { MessageInterface } from "../../interface/message.interface";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto
  implements Omit<MessageInterface, "id" | "type" | "createdAt" | "updatedAt">
{
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
}
