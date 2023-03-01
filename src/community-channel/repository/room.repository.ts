import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RoomEntity } from "../entities/room.entity";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class RoomRepository extends Repository<RoomEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(RoomEntity, dataSource.createEntityManager());
  }
}
