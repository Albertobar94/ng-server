import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./repository/user.repository";

@Module({
  controllers: [UserController],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
