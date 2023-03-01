import { RoomEntity } from "./../entities/room.entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { MessageEntity } from "../entities/message.entity";
import { RepositoryInterface } from "src/shared/repository/base.repository";

@Injectable()
export class MessageRepository implements RepositoryInterface<MessageEntity> {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async insert(entity: MessageEntity): Promise<MessageEntity> {
    console.log(entity);
    return this.dataSource.getRepository(MessageEntity).save(entity);
  }

  async selectById(id: string): Promise<MessageEntity | MessageEntity[]> {
    return this.dataSource
      .getRepository(MessageEntity)
      .createQueryBuilder()
      .where({ id })
      .getOne();
  }

  async upsert(
    entity: MessageEntity,
  ): Promise<MessageEntity | MessageEntity[]> {
    return this.dataSource.getRepository(MessageEntity).save(entity);
  }

  async remove(id: MessageEntity["id"]): Promise<void> {
    await this.dataSource.getRepository(MessageEntity).delete(id);

    return;
  }

  async selectByRoomId(
    roomId: RoomEntity["id"],
  ): Promise<MessageEntity | MessageEntity[]> {
    return this.dataSource
      .getRepository(MessageEntity)
      .createQueryBuilder()
      .where({ roomId })
      .getMany();
  }
}
