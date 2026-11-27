import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import type { AuthContextValue } from "../context/auth-context";
import { useAuth } from "../hooks/useAuth";
import { ProtectedRoute } from "../routes/ProtectedRoute";

vi.mock("../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);

function renderProtectedRoute(status: AuthContextValue["status"]) {
  mockedUseAuth.mockReturnValue({
    status,
    user: null,
    accessToken: null,
    sessionMessage: "",
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    retrySession: vi.fn(),
    clearSessionMessage: vi.fn(),
  });

  return render(
    <MemoryRouter initialEntries={["/tasks"]}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<p>Contenido protegido</p>} />
        </Route>
        <Route path="/login" element={<p>Página de inicio de sesión</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a pending state while checking the session", () => {
    renderProtectedRoute("checking");

    expect(screen.getByRole("status")).toHaveTextContent(
      "Validando la sesión...",
    );
    expect(screen.queryByText("Contenido protegido")).not.toBeInTheDocument();
  });

  it("redirects anonymous users to login", () => {
    renderProtectedRoute("anonymous");

    expect(
      screen.getByText("Página de inicio de sesión"),
    ).toBeInTheDocument();
  });

  it("renders the protected content for an authenticated user", () => {
    mockedUseAuth.mockReturnValue({
      status: "authenticated",
      user: {
        id: "user-1",
        name: "Test User",
        email: "test@example.com",
        role: "user",
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
      },
      accessToken: "test-access-token",
      sessionMessage: "",
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      retrySession: vi.fn(),
      clearSessionMessage: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/tasks"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<p>Contenido protegido</p>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Contenido protegido")).toBeInTheDocument();
  });
});
