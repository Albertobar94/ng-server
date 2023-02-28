import { randomUUID } from "crypto";
import { plainToInstance } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserInterface } from "../interface/user.interface";

@Entity({ name: "user" })
export class UserEntity implements UserInterface {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ name: "first_name" })
  readonly firstName: string;

  @Column({ name: "last_name" })
  readonly lastName: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  readonly updatedAt: Date;

  public static create(
    user: Omit<UserInterface, "id" | "createdAt" | "updatedAt">,
  ): UserEntity {
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return plainToInstance(UserEntity, { ...user, createdAt, updatedAt, id });
  }

  public static update(
    user: Omit<UserInterface, "createdAt" | "updatedAt">,
  ): UserEntity {
    const id = user.id;
    const updatedAt = new Date();

    return plainToInstance(UserEntity, { ...user, updatedAt, id });
  }
}
