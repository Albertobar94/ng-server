import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class addUserTable1677241963513 implements MigrationInterface {
  createIndices = true;
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "first_name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "last_name",
            type: "varchar",
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
    await queryRunner.dropTable("user");
  }
}
