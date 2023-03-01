import {
  ApiExtraModels,
  ApiCreatedResponse,
  getSchemaPath,
  ApiOkResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import { StatusCodes } from "http-status-codes";
import { applyDecorators, Type } from "@nestjs/common";
import { PageDto } from "../dto/page.dto";
import { UserResponseDto } from "../../user/dto/response/user-response.dto";
import { RoomResponseDto } from "../../community-channel/dto/response/room-response.dto";
import { MessageResponseDto } from "../../community-channel/dto/response/message-response.dto";
import { ParticipantsResponseDto } from "../../community-channel/dto/response/participants-response.dto";

const responseDecorator = <TModel extends Type<any>>(
  model: TModel,
  responseCode: number,
) => {
  switch (responseCode) {
    case StatusCodes.CREATED:
      return ApiCreatedResponse({
        description: "Successfully received model list",
        schema: {
          allOf: [
            { $ref: getSchemaPath(PageDto) },
            {
              properties: {
                data: {
                  type: "array",
                  items: { $ref: getSchemaPath(model) },
                },
              },
            },
          ],
        },
      });
    case StatusCodes.NO_CONTENT:
      return ApiNoContentResponse({
        description: "Successfully removed model list",
        schema: {
          allOf: [
            { $ref: getSchemaPath(PageDto) },
            {
              properties: {
                data: {
                  type: "array",
                  items: { $ref: getSchemaPath(model) },
                },
              },
            },
          ],
        },
      });
    default:
      return ApiOkResponse({
        description: "Successfully received model list",
        schema: {
          allOf: [
            { $ref: getSchemaPath(PageDto) },
            {
              properties: {
                data: {
                  type: "array",
                  items: { $ref: getSchemaPath(model) },
                },
              },
            },
          ],
        },
      });
  }
};
export const ApiResponse = <TModel extends Type<any>>(
  model: TModel,
  responseCode: number,
) => {
  return applyDecorators(
    ApiExtraModels(PageDto),
    ApiExtraModels(UserResponseDto),
    ApiExtraModels(RoomResponseDto),
    ApiExtraModels(MessageResponseDto),
    ApiExtraModels(ParticipantsResponseDto),
    responseDecorator(model, responseCode),
  );
};
