import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { RoomParticipantEntity } from "../entities/room-participant.entity";

@Injectable()
export class RoomParticipantRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async insert(
    entities: RoomParticipantEntity[],
  ): Promise<RoomParticipantEntity | RoomParticipantEntity[]> {
    return this.dataSource.getRepository(RoomParticipantEntity).save(entities);
  }

  async selectAll(
    roomId: unknown,
  ): Promise<RoomParticipantEntity | RoomParticipantEntity[]> {
    return this.dataSource
      .getRepository(RoomParticipantEntity)
      .createQueryBuilder()
      .where({ roomId })
      .getMany();
  }

  async upsert(
    entities: RoomParticipantEntity[],
  ): Promise<RoomParticipantEntity | RoomParticipantEntity[]> {
    return this.dataSource
      .getRepository(RoomParticipantEntity)
      .createQueryBuilder()
      .insert()
      .into(RoomParticipantEntity)
      .values(entities)
      .returning("*");
  }
}
