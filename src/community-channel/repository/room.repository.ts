import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { RoomEntity } from "../entities/room.entity";
import { RepositoryInterface } from "../../shared/repository/base.repository";

@Injectable()
export class RoomRepository implements RepositoryInterface<RoomEntity> {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async insert(entity: RoomEntity): Promise<RoomEntity> {
    return this.dataSource.getRepository(RoomEntity).save(entity);
  }

  async selectById(id: string): Promise<RoomEntity | RoomEntity[]> {
    return this.dataSource.getRepository(RoomEntity).find({
      relations: ["images", "user"],
      where: { user: { id: id } },
    });
  }

  async upsert(entity: RoomEntity): Promise<RoomEntity | RoomEntity[]> {
    return this.dataSource.getRepository(RoomEntity).save(entity);
  }

  async remove(id: RoomEntity["id"]): Promise<void> {
    await this.dataSource.getRepository(RoomEntity).delete(id);

    return;
  }
}
