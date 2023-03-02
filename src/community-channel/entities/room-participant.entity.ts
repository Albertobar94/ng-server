import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { RoomEntity } from "./room.entity";

@Entity({ name: "room_participant" })
export class RoomParticipantEntity {
  constructor(roomId: string, participant: string) {
    this.roomId = roomId;
    this.participant = participant;
  }

  @PrimaryColumn("uuid", { name: "room_id" })
  readonly roomId: string;

  @Column("uuid") // userId
  readonly participant: string;

  @CreateDateColumn({ name: "joined_at", type: "timestamptz" })
  joinedAt: Date;

  @Column("timestamptz", { name: "left_at", nullable: true })
  leftAt?: Date;

  @ManyToOne(() => RoomEntity, (room) => room.participants)
  @JoinColumn({ name: "room_id" })
  readonly room: RoomEntity;

  public setJoined(): RoomParticipantEntity {
    this.joinedAt = new Date();

    return this;
  }

  public setLeft(): RoomParticipantEntity {
    this.leftAt = new Date();

    return this;
  }
}
