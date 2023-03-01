import * as Joi from "joi";
import { DataSource } from "typeorm";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { UserEntity } from "./user/entities/user.entity";
import { CommunityChannelModule } from "./community-channel/community-channel.module";
import { MessageEntity } from "./community-channel/entities/message.entity";
import { RoomParticipantEntity } from "./community-channel/entities/room-participant.entity";
import { RoomEntity } from "./community-channel/entities/room.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ENVIRONMENT: Joi.string().required(),
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PWD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
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
        entities: [
          UserEntity,
          MessageEntity,
          RoomParticipantEntity,
          RoomEntity,
        ],
        poolSize: process.env.NODE_ENV === "production" ? 1 : 10,
        logging: process.env.NODE_ENV === "production" ? false : true,
        migrations: ["dist/database/migration/**/*.ts"],
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
})
export class AppModule {}
