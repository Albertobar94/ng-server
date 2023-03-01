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
  constructor(
    id?: string,
    participants?: ReadonlyArray<RoomParticipantEntity>,
  ) {
    this.id = id ?? randomUUID();
    this.participants = participants;
  }

  @PrimaryColumn("uuid")
  readonly id: string;

  @OneToMany(() => RoomParticipantEntity, (participant) => participant.roomId)
  @JoinColumn()
  readonly participants: ReadonlyArray<RoomParticipantEntity>;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;

  public create(): RoomEntity {
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return this;
  }

  public setParticipants(participants: RoomParticipantEntity[]) {
    return plainToInstance(RoomEntity, { ...this, participants });
  }
}
