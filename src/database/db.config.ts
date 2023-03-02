import { DataSource } from "typeorm";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

const DbMigrationConfig = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  logging: true,
  migrations: [process.env.DB_MIGRATIONS_PATH],
});

export default DbMigrationConfig;
