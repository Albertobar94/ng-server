import { RoomParticipantInterface } from "./room-participant.interface";

export interface RoomInterface {
  readonly id: string;
  readonly participants: ReadonlyArray<RoomParticipantInterface>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
