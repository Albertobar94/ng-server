import { randomUUID } from "crypto";
import { plainToInstance } from "class-transformer";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { UserInterface } from "../interface/user.interface";
import { IsString } from "class-validator";

@Entity({ name: "user" })
export class UserEntity implements UserInterface {
  @PrimaryColumn("uuid")
  @IsString()
  readonly id: string;

  @Column({ name: "first_name" })
  @IsString()
  readonly firstName: string;

  @Column({ name: "last_name" })
  @IsString()
  readonly lastName: string;

  public static create(user: UserInterface): UserEntity {
    const id = user.id ?? randomUUID();

    return plainToInstance(UserEntity, { ...user, id });
  }

  public static update(user: UserInterface): UserEntity {
    const id = user.id;

    return plainToInstance(UserEntity, { ...user, id });
  }

  public static setId(id: UserInterface["id"]): UserEntity {
    return plainToInstance(UserEntity, { id });
  }
}
