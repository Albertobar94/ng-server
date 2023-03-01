import { MESSAGE_CONTENT_TYPE } from "src/shared/constants";

export interface MessageInterface {
  readonly id: string;
  readonly value: string;
  readonly type: "message";
  readonly contentType: MESSAGE_CONTENT_TYPE;
  readonly roomId: string;
  readonly userId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
