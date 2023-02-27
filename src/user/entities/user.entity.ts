import { randomUUID } from "crypto";
import { IsString } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { UserInterface } from "../interface/user.interface";

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

  public static create(user: Omit<UserInterface, "id">): UserEntity {
    const id = randomUUID();

    return plainToInstance(UserEntity, { ...user, id });
  }

  public static update(user: UserInterface): UserEntity {
    const id = user.id;

    return plainToInstance(UserEntity, { ...user, id });
  }
}
