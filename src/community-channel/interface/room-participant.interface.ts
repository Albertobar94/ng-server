export interface RoomParticipantInterface {
  readonly roomId: string;
  readonly participant: string;
  readonly createdAt: Date;
  readonly deletedAt?: Date;
  readonly deleted: boolean;
}
