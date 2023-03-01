import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { randomUUID } from "crypto";
import { plainToInstance } from "class-transformer";
import { MESSAGE_CONTENT_TYPE } from "../../shared/constants";
import { MessageInterface } from "../interface/message.interface";

@Entity({ name: "message" })
export class MessageEntity implements MessageInterface {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("text")
  readonly value: string;

  @Column({ enum: ["message"] })
  readonly type: "message";

  @Column({ name: "content_type", enum: MESSAGE_CONTENT_TYPE })
  readonly contentType: MESSAGE_CONTENT_TYPE;

  @Column({ name: "room_id" })
  readonly roomId: string;

  @Column({ name: "user_id" })
  readonly userId: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  readonly updatedAt: Date;
  public static createTextMessage(
    message: Omit<MessageInterface, "id" | "type" | "createdAt" | "updatedAt">,
  ): MessageEntity {
    const id = randomUUID();
    const type = "message";
    const contentType = "text";
    const createdAt = new Date();
    const updatedAt = new Date();

    return plainToInstance(MessageEntity, {
      createdAt,
      updatedAt,
      value: message.value,
      roomId: message.roomId,
      userId: message.userId,
      contentType,
      type,
      id,
    });
  }
}
