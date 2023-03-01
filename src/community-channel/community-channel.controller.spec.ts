import { Test, TestingModule } from "@nestjs/testing";

describe("CommunityChannelController", () => {
  let roomController: RoomController;
  let messageController: MessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController, MessageController],
      providers: [],
    }).compile();

    roomController = module.get<RoomController>(RoomController);
    messageController = module.get<MessageController>(MessageController);
  });

  it("should be defined", () => {
    expect(roomController).toBeDefined();
    expect(messageController).toBeDefined();
  });
});
