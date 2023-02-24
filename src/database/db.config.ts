import { DataSource } from "typeorm";

const DbDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "community_channel",
  synchronize: false,
  logging: true,
  poolSize: 10,
  migrationsRun: false,
  migrations: ["src/database/migration/**/*.ts"],
});

export default DbDataSource;
