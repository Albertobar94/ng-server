import { RoomEntity } from "./entities/room.entity";
import { Injectable } from "@nestjs/common";
import { MessageRepository } from "./repository/message.repository";
import { MessageEntity } from "./entities/message.entity";
import { RoomParticipantEntity } from "./entities/room-participant.entity";
import { RoomParticipantRepository } from "./repository/room-participant.repository";
import { RoomRepository } from "./repository/room.repository";

@Injectable()
export class CommunityChannelService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly messageRepository: MessageRepository,
    private readonly roomParticipantRepository: RoomParticipantRepository,
  ) {}

  async createRoom(
    roomEntity: RoomEntity,
    participants: ReadonlyArray<string>,
  ) {
    const participantEntities = participants.map((p) =>
      RoomParticipantEntity.addParticipant(roomEntity.id, p),
    );
    await this.roomParticipantRepository.insert(participantEntities);

    return this.roomRepository.insert(roomEntity);
  }

  async getRoom(roomId: string) {
    const room = this.roomRepository.selectById(roomId);
    const participants = this.roomParticipantRepository.selectAll(roomId);

    return room;
  }

  async getMessages(
    roomId: RoomEntity["id"],
  ): Promise<MessageEntity | MessageEntity[]> {
    return this.messageRepository.selectByRoomId(roomId);
  }

  async addParticipants(
    roomId: string,
    participants: ReadonlyArray<string>,
  ): Promise<RoomParticipantEntity | RoomParticipantEntity[]> {
    const entities = participants.map((p) =>
      RoomParticipantEntity.addParticipant(roomId, p),
    );

    return this.roomParticipantRepository.insert(entities);
  }

  async removeParticipants(
    roomId: string,
    participants: ReadonlyArray<string>,
  ) {
    const entities = participants.map((p) =>
      RoomParticipantEntity.removeParticipant(roomId, p),
    );

    return this.roomParticipantRepository.upsert(entities);
  }
}
