import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { RoomEntity } from "./entities/room.entity";
import { MessageEntity } from "./entities/message.entity";
import { RoomRepository } from "./repository/room.repository";
import { CreateRoomDto } from "./dto/request/create-room.dto";
import { ParticipantsDto } from "./dto/request/participants.dto";
import { CreateMessageDto } from "./dto/request/create-message.dto";
import { MessageRepository } from "./repository/message.repository";
import { CommunityChannelService } from "./community-channel.service";
import { doesUserExistsGuard } from "src/guards/does-user-exists.guard";

@Controller("community-channel")
export class CommunityChannelController {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly messageRepository: MessageRepository,
    private readonly communityChannelService: CommunityChannelService,
  ) {}
  /* -------------------------------------------------------------------------- */
  /*                                    Room                                    */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Create Room ------------------------------ */

  @ApiTags("Room")
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    // type: [RoomResponseDto],
  })
  @UseGuards(doesUserExistsGuard)
  @HttpCode(201)
  @Post("/room")
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    const roomEntity = RoomEntity.create();

    return this.communityChannelService.createRoom(
      roomEntity,
      createRoomDto.participants,
    );
  }

  /* ------------------------------ Get Room Info ----------------------------- */

  @ApiTags("Room")
  @ApiOkResponse({
    description: "The record has been successfully fetched.",
    // type: [RoomResponseDto],
  })
  @Get("/room/:roomId")
  getRoom(@Param("roomId") id: RoomEntity["id"]) {
    return this.roomRepository.selectById(id);
  }

  /* ------------------------------- Delete Room ------------------------------ */

  @ApiTags("Room")
  @ApiNoContentResponse({
    description: "The record has been successfully deleted.",
  })
  @HttpCode(204)
  @Delete("/room/:roomId")
  remove(@Param("roomId") id: RoomEntity["id"]) {
    return this.roomRepository.remove(id);
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Participant                                */
  /* -------------------------------------------------------------------------- */

  /* ---------------------------- Add Participants ---------------------------- */
  @ApiTags("Participant")
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    // type: [ParticipantResponseDto],
  })
  @HttpCode(201)
  @UseGuards(doesUserExistsGuard)
  @Post("/room/participants")
  addParticipants(@Body() { roomId, participants }: ParticipantsDto) {
    return this.communityChannelService.addParticipants(roomId, participants);
  }

  /* --------------------------- Delete Participants -------------------------- */
  @ApiTags("Participant")
  @ApiNoContentResponse({
    description: "The record has been successfully deleted.",
  })
  @UseGuards(doesUserExistsGuard)
  @HttpCode(204)
  @Delete("/room/participants")
  removeParticipants(@Body() { roomId, participants }: ParticipantsDto) {
    return this.communityChannelService.removeParticipants(
      roomId,
      participants,
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Message                                  */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Get Messages ------------------------------ */

  @ApiTags("Message")
  @ApiOkResponse({
    description: "The record has been successfully fetched.",
    // type: [RoomResponseDto],
  })
  @Get("/room/:roomId/messages")
  getMessages(@Param("roomId") roomId: string) {
    return this.communityChannelService.getMessages(roomId);
  }

  /* --------------------------- Create Text Message -------------------------- */

  @ApiTags("Message")
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    // type: [RoomResponseDto],
  })
  @HttpCode(201)
  @UseGuards(doesUserExistsGuard)
  @Post("/message/text-message")
  createTextMessage(@Body() createMessageDto: CreateMessageDto) {
    const entity = MessageEntity.createTextMessage(createMessageDto);

    console.log(entity);

    return this.messageRepository.insert(entity);
  }
}
