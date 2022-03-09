import { JSDOM } from "jsdom";
import { streakCounter } from "../src";

describe("basic test", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});

describe("streakCounter", () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDom = new JSDOM("", { url: "https://localhost" });
    mockLocalStorage = mockJSDom.window.localStorage;
  });

  it("should return a streak object with currentCount, startDate and lastLoginDate", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak.hasOwnProperty("currentCount")).toBe(true);
    expect(streak.hasOwnProperty("startDate")).toBe(true);
    expect(streak.hasOwnProperty("lastLoginDate")).toBe(true);
  });
});
