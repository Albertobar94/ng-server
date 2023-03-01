import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addMessageTable1677330073583 implements MigrationInterface {
  createIndices = true;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "message",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "value",
            type: "text",
            isNullable: false,
          },
          {
            name: "type",
            type: "enum",
            enum: ["message"],
            isNullable: false,
          },
          {
            name: "content_type",
            type: "enum",
            enum: ["text", "reaction"],
            isNullable: false,
          },
          {
            name: "room_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
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
    await queryRunner.dropTable("message");
  }
}
