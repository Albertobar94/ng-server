import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addRoomTable1677330065370 implements MigrationInterface {
  createIndices = true;
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "room",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "created_at",
            type: "timestamptz",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamptz",
            isNullable: false,
          },
        ],
      }),
      this.createIndices,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("room");
  }
}
