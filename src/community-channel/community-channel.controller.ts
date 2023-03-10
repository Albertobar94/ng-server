import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { StatusCodes } from "http-status-codes";
import { ApiNoContentResponse, ApiTags } from "@nestjs/swagger";
import { PageDto } from "../shared/dto/page.dto";
import { RoomEntity } from "./entities/room.entity";
import { MessageEntity } from "./entities/message.entity";
import { CreateRoomDto } from "./dto/request/create-room.dto";
import { PageOptionsDto } from "src/shared/dto/page-options.dto";
import { RoomResponseDto } from "./dto/response/room-response.dto";
import { MessageRepository } from "./repository/message.repository";
import { CreateMessageDto } from "./dto/request/create-message.dto";
import { CommunityChannelService } from "./community-channel.service";
import { doesUserExistsGuard } from "src/guards/does-user-exists.guard";
import { ParticipantsDto } from "./dto/request/create-participants.dto";
import { MessageResponseDto } from "./dto/response/message-response.dto";
import { ApiResponse } from "../shared/decorators/api-response.decorator";
import { RoomParticipantEntity } from "./entities/room-participant.entity";

@Controller("community-channel")
@UseInterceptors(ClassSerializerInterceptor)
export class CommunityChannelController {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly communityChannelService: CommunityChannelService,
  ) {}
  /* -------------------------------------------------------------------------- */
  /*                                    Room                                    */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Create Room ------------------------------ */

  @ApiTags("Room")
  @ApiResponse(RoomResponseDto, StatusCodes.CREATED)
  @UseGuards(doesUserExistsGuard)
  @HttpCode(StatusCodes.CREATED)
  @Post("/room")
  createRoom(
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<PageDto<RoomEntity>> {
    return this.communityChannelService.createRoom(createRoomDto);
  }

  /* ------------------------------ Get Room Info ----------------------------- */

  @ApiTags("Room")
  @ApiResponse(RoomResponseDto, StatusCodes.OK)
  @Get("/room/:roomId")
  getRoom(@Param("roomId") id: RoomEntity["id"]): Promise<PageDto<RoomEntity>> {
    return this.communityChannelService.getRoom(id);
  }

  /* ---------------------------- Add Participants ---------------------------- */
  @ApiTags("Room")
  @ApiResponse(RoomResponseDto, StatusCodes.CREATED)
  @HttpCode(StatusCodes.CREATED)
  @UseGuards(doesUserExistsGuard)
  @Post("/room/participants")
  addParticipants(
    @Body() { roomId, participants }: ParticipantsDto,
  ): Promise<PageDto<RoomParticipantEntity>> {
    return this.communityChannelService.addParticipants(roomId, participants);
  }

  /* --------------------------- Delete Participants -------------------------- */
  @ApiTags("Room")
  @ApiNoContentResponse({
    description: "The record has been successfully deleted.",
  })
  @UseGuards(doesUserExistsGuard)
  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete("/room/participants")
  removeParticipants(
    @Body() { roomId, participants }: ParticipantsDto,
  ): Promise<void> {
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
  @ApiResponse(MessageResponseDto, StatusCodes.OK)
  @Get("/room/:roomId/messages")
  getMessages(
    @Param("roomId") roomId: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<MessageEntity>> {
    return this.communityChannelService.getMessages(roomId, pageOptionsDto);
  }

  /* --------------------------- Create Text Message -------------------------- */

  @ApiTags("Message")
  @ApiResponse(MessageResponseDto, StatusCodes.CREATED)
  @HttpCode(StatusCodes.CREATED)
  @UseGuards(doesUserExistsGuard)
  @Post("/message/text-message")
  async createTextMessage(
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<PageDto<MessageEntity>> {
    const newMessage = new MessageEntity(
      createMessageDto.roomId,
      createMessageDto.userId,
      createMessageDto.value,
    ).setCreated();

    const entity = await this.messageRepository.save(newMessage);

    return new PageDto(new Array(entity), null);
  }
}
