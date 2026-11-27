import { afterEach, describe, expect, it, vi } from "vitest";
import { API_URL } from "../config/env";
import {
  httpRequest,
  setUnauthorizedHandler,
} from "../services/http.service";

describe("httpRequest", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends JSON requests with the bearer token and parses the response", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ data: { id: "task-1" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await httpRequest<{ data: { id: string } }>(
      "/tasks",
      { method: "POST", body: JSON.stringify({ title: "Test" }) },
      "test-access-token",
    );

    expect(result.data.id).toBe("task-1");
    expect(fetchMock).toHaveBeenCalledWith(
      `${API_URL}/tasks`,
      expect.any(Object),
    );
    const requestHeaders = new Headers(fetchMock.mock.calls[0]?.[1]?.headers);
    expect(requestHeaders.get("Accept")).toBe("application/json");
    expect(requestHeaders.get("Authorization")).toBe(
      "Bearer test-access-token",
    );
    expect(requestHeaders.get("Content-Type")).toBe("application/json");
  });

  it("returns undefined for a successful 204 response", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(null, { status: 204 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(httpRequest<void>("/tasks/task-1", { method: "DELETE" })).resolves
      .toBeUndefined();
  });

  it("ends the session on 401 and preserves API errors such as 403", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            error: { code: "TOKEN_EXPIRED", message: "Token expirado" },
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            error: { code: "FORBIDDEN", message: "Acceso denegado" },
          }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          },
        ),
      );
    vi.stubGlobal("fetch", fetchMock);
    const unauthorizedHandler = vi.fn();
    const removeUnauthorizedHandler =
      setUnauthorizedHandler(unauthorizedHandler);

    try {
      await expect(
        httpRequest("/tasks", {}, "test-access-token"),
      ).rejects.toMatchObject({
        status: 401,
        code: "TOKEN_EXPIRED",
      });
      await expect(
        httpRequest("/tasks", {}, "test-access-token"),
      ).rejects.toMatchObject({
        status: 403,
        code: "FORBIDDEN",
      });
    } finally {
      removeUnauthorizedHandler();
    }

    expect(unauthorizedHandler).toHaveBeenCalledTimes(1);
  });
});
