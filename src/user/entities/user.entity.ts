import { randomUUID } from "crypto";
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
  constructor(firstName?: string, lastName?: string) {
    this.id = randomUUID();
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;

  public setCreated(): UserEntity {
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return this;
  }

  public update(
    props: Omit<UserInterface, "createdAt" | "updatedAt">,
  ): UserEntity {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.updatedAt = new Date();

    return this;
  }
}
