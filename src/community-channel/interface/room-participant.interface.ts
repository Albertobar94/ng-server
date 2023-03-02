export interface RoomParticipantInterface {
  readonly roomId: string;
  readonly participant: string;
  joinedAt: Date;
  leftAt?: Date;
}
