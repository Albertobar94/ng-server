import { randomUUID } from "crypto";
import { plainToInstance } from "class-transformer";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { RoomInterface } from "../interface/room.interface";
import { RoomParticipantEntity } from "./room-participant.entity";

@Entity({ name: "room" })
export class RoomEntity implements RoomInterface {
  @PrimaryColumn("uuid")
  readonly id: string;

  @OneToMany(() => RoomParticipantEntity, (participant) => participant.roomId)
  @JoinColumn()
  readonly participants: ReadonlyArray<RoomParticipantEntity>;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  readonly updatedAt: Date;

  public static create(): RoomEntity {
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    return plainToInstance(RoomEntity, { createdAt, updatedAt, id });
  }
}
