import { create } from "./lib";

describe("Main", () => {
  it("create should return a function", () => {
    const dumbData = {};
    expect(typeof create(dumbData)).toBe("function");
  });
});
