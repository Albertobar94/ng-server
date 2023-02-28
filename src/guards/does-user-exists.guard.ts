import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from "@nestjs/common";
import { Request } from "express";
import { UserRepository } from "../user/repository/user.repository";

@Injectable()
export class doesUserExistsGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  private readonly logger = new Logger(doesUserExistsGuard.name);
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const controllerName = context.getClass().name;
    const methodName = context.getHandler().name;
    const userIds = this.extractUserIds(request);
    const users = await this.getValidUsers(userIds);

    return this.isResponseValid(userIds, users, methodName, controllerName);
  }

  private extractUserIds(request) {
    let userIds = [];
    if (request.body["userId"]) {
      userIds.push(request.body["userId"]);
    } else if (request.body["participants"]) {
      userIds = userIds.concat(request.body["participants"]);
    }

    return userIds;
  }

  private async getValidUsers(userIds: string[]) {
    const users = await Promise.all(
      userIds.map((uid) => this.userRepository.selectById(uid)),
    );
    return users.filter((u) => u);
  }

  private isResponseValid(
    userIds: string[],
    users: any[],
    methodName: string,
    controllerName: string,
  ) {
    if (!users.length || userIds.length !== users.length) {
      this.logger.warn(
        `Some user does not exists in DB | ${methodName} of ${controllerName}`,
        userIds,
      );

      return false;
    }

    return true;
  }
}
