import { ExecutionTimeInterceptor } from "./execution-time.interceptor";

describe("ExecutionTimeInterceptor", () => {
  it("should be defined", () => {
    expect(new ExecutionTimeInterceptor()).toBeDefined();
  });
});
