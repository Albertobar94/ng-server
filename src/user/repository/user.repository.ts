import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  async selectById(id: string): Promise<UserEntity> {
    return this.createQueryBuilder().where({ id }).getOne();
  }
}
