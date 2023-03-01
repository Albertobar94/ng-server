import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { InjectDataSource } from "@nestjs/typeorm";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  async selectById(id: string): Promise<UserEntity> {
    return this.createQueryBuilder().where({ id }).getOne();
  }
}
