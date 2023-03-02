import { Injectable } from "@nestjs/common";
import { PageDto } from "../shared/dto/page.dto";
import { RoomEntity } from "./entities/room.entity";
import { PageMetaDto } from "../shared/dto/page-meta.dto";
import { MessageEntity } from "./entities/message.entity";
import { RoomRepository } from "./repository/room.repository";
import { PageOptionsDto } from "../shared/dto/page-options.dto";
import { MessageRepository } from "./repository/message.repository";
import { RoomParticipantEntity } from "./entities/room-participant.entity";
import { RoomParticipantRepository } from "./repository/room-participant.repository";
import { CreateRoomDto } from "./dto/request/create-room.dto";

@Injectable()
export class CommunityChannelService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly messageRepository: MessageRepository,
    private readonly roomParticipantRepository: RoomParticipantRepository,
  ) {}

  async createRoom({
    participants,
  }: CreateRoomDto): Promise<PageDto<RoomEntity>> {
    const room = new RoomEntity().create();
    const newParticipantEntities = participants.map((p) =>
      new RoomParticipantEntity(room.id, p).setJoined(),
    );
    const [roomEntity] = await Promise.all([
      this.roomRepository.save(room),
      this.roomParticipantRepository.save(newParticipantEntities),
    ]);

    return new PageDto(new Array(roomEntity), null);
  }

  async getRoom(roomId: string): Promise<PageDto<RoomEntity>> {
    const roomEntity = await this.roomRepository
      .createQueryBuilder("room")
      .leftJoinAndSelect("room.participants", "room_participant")
      .where({ id: roomId })
      .getMany();

    return new PageDto(roomEntity, null);
  }

  async getMessages(
    roomId: RoomEntity["id"],
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<MessageEntity>> {
    const queryBuilder = this.messageRepository.createQueryBuilder("message");

    queryBuilder
      .where({ roomId })
      .orderBy("message.created_at", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async addParticipants(
    roomId: string,
    participants: ReadonlyArray<string>,
  ): Promise<PageDto<RoomParticipantEntity>> {
    const roomParticipants = participants.map((p) =>
      new RoomParticipantEntity(roomId, p).setJoined(),
    );
    const entities = await this.roomParticipantRepository
      .createQueryBuilder()
      .insert()
      .into(RoomParticipantEntity)
      .values(roomParticipants)
      .returning("*")
      .execute()
      .then((r) => r.generatedMaps as RoomParticipantEntity[]);

    return new PageDto(entities, null);
  }

  async removeParticipants(
    roomId: string,
    participants: ReadonlyArray<string>,
  ): Promise<void> {
    const removedParticipants = participants.map((p) =>
      new RoomParticipantEntity(roomId, p).setLeft(),
    );
    await this.roomParticipantRepository.save(removedParticipants);

    return;
  }
}
