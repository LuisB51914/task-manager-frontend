import { beforeEach, describe, expect, it } from "vitest";
import {
  readAccessToken,
  removeAccessToken,
  storeAccessToken,
} from "../services/session.service";

describe("session storage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("returns null when no access token is stored", () => {
    expect(readAccessToken()).toBeNull();
  });

  it("stores and reads the access token for the current tab", () => {
    storeAccessToken("test-access-token");

    expect(readAccessToken()).toBe("test-access-token");
  });

  it("removes the stored access token", () => {
    storeAccessToken("test-access-token");

    removeAccessToken();

    expect(readAccessToken()).toBeNull();
  });
});
