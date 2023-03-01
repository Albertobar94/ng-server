import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RoomParticipantEntity } from "../entities/room-participant.entity";

@Injectable()
export class RoomParticipantRepository extends Repository<RoomParticipantEntity> {}
