import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addRoomParticipantTable1677580999157
  implements MigrationInterface
{
  createIndices = true;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "room_participant",
        columns: [
          {
            name: "room_id",
            type: "uuid",
          },
          {
            name: "participant",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "joined_at",
            type: "timestamptz",
            isNullable: false,
          },
          {
            name: "left_at",
            type: "timestamptz",
            isNullable: true,
          },
        ],
      }),
      this.createIndices,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("room_participant");
  }
}
