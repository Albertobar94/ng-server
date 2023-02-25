import { DataSource } from "typeorm";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { CommunityChannelModule } from "./community-channel/community-channel.module";
import { User } from "./user/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: Number(configService.get("DB_PORT")),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PWD"),
        database: configService.get("DB_NAME"),
        entities: [User],
        poolSize: process.env.NODE_ENV === "production" ? 1 : 10,
        logging: process.env.NODE_ENV === "production" ? false : true,
        migrations: ["src/database/migration/**/*.ts"],
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    ConfigModule.forRoot(),
    CommunityChannelModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
