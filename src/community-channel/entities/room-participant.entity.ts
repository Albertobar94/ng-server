import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

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

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @Column("timestamptz", { name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @Column("boolean", { default: false })
  deleted: boolean;

  public setCreated(): RoomParticipantEntity {
    this.deleted = false;
    this.createdAt = new Date();

    return this;
  }

  public setDeleted(): RoomParticipantEntity {
    this.deleted = true;
    this.deletedAt = new Date();

    return this;
  }
}
