import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RoomParticipantEntity } from "../entities/room-participant.entity";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class RoomParticipantRepository extends Repository<RoomParticipantEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(RoomParticipantEntity, dataSource.createEntityManager());
  }
}
