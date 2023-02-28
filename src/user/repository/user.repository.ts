import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { RepositoryInterface } from "../../shared/repository/base.repository";

@Injectable()
export class UserRepository implements RepositoryInterface<UserEntity> {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async insert(entity: UserEntity): Promise<UserEntity> {
    return this.dataSource.getRepository(UserEntity).save(entity);
  }

  async selectById(id: UserEntity["id"]): Promise<UserEntity | null> {
    return this.dataSource.getRepository(UserEntity).findOne({ where: { id } });
  }

  async upsert(entity: UserEntity): Promise<UserEntity> {
    return this.dataSource.getRepository(UserEntity).save(entity);
  }

  async remove(id: UserEntity["id"]): Promise<void> {
    await this.dataSource.getRepository(UserEntity).delete(id);
  }
}
