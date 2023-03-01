import { plainToInstance } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "room_participant" })
export class RoomParticipantEntity {
  @PrimaryColumn("uuid", { name: "room_id" })
  readonly roomId: string;

  @Column("uuid") // userId
  readonly participant: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  readonly createdAt: Date;

  @Column("timestamptz", { name: "deleted_at", nullable: true })
  readonly deletedAt?: Date;

  @Column("boolean", { default: false })
  readonly deleted: boolean;

  public static addParticipant(
    roomId: string,
    participant: string,
  ): RoomParticipantEntity {
    return plainToInstance(RoomParticipantEntity, {
      roomId,
      participant,
      createdAt: new Date(),
    });
  }

  public static removeParticipant(
    roomId: string,
    participant: string,
  ): RoomParticipantEntity {
    return plainToInstance(RoomParticipantEntity, {
      roomId,
      participant,
      deleted: true,
      deletedAt: new Date(),
    });
  }
}
