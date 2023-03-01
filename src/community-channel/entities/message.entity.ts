import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { randomUUID } from "crypto";
import { MESSAGE_CONTENT_TYPE } from "../../shared/constants";
import { MessageInterface } from "../interface/message.interface";

@Entity({ name: "message" })
export class MessageEntity implements MessageInterface {
  constructor(roomId: string, userId: string, value: string) {
    this.id = randomUUID();
    this.type = "message";
    this.contentType = MESSAGE_CONTENT_TYPE.text;
    this.value = value;
    this.roomId = roomId;
    this.userId = userId;
  }

  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("text")
  readonly value: string;

  @Column({ enum: ["message"] })
  readonly type: "message";

  @Column({ name: "content_type", enum: MESSAGE_CONTENT_TYPE })
  readonly contentType: MESSAGE_CONTENT_TYPE.text;

  @Column({ name: "room_id" })
  readonly roomId: string;

  @Column({ name: "user_id" })
  readonly userId: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
  public setCreated(): MessageEntity {
    this.createdAt = new Date();
    this.updatedAt = new Date();

    return this;
  }
}
