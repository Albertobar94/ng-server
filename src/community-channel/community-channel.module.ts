import { Module } from "@nestjs/common";
import { CommunityChannelController } from "./community-channel.controller";
import { CommunityChannelService } from "./community-channel.service";
import { MessageRepository } from "./repository/message.repository";
import { RoomParticipantRepository } from "./repository/room-participant.repository";
import { RoomRepository } from "./repository/room.repository";
import { UserRepository } from "../user/repository/user.repository";

@Module({
  controllers: [CommunityChannelController],
  providers: [
    CommunityChannelService,
    MessageRepository,
    RoomParticipantRepository,
    RoomRepository,
    UserRepository,
  ],
})
export class CommunityChannelModule {}
