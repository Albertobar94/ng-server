export interface RoomParticipantInterface {
  readonly roomId: string;
  readonly participant: string;
  createdAt: Date;
  deletedAt?: Date;
  deleted: boolean;
}
