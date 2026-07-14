import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, it, vi } from "vitest";
import { PwaPrompt } from "./PwaPrompt";

const pwaState = vi.hoisted(() => ({
  offlineReady: false,
  needRefresh: false,
  setOfflineReady: vi.fn(),
  setNeedRefresh: vi.fn(),
  updateServiceWorker: vi.fn()
}));

vi.mock("virtual:pwa-register/react", () => ({
  useRegisterSW: () => ({
    offlineReady: [pwaState.offlineReady, pwaState.setOfflineReady],
    needRefresh: [pwaState.needRefresh, pwaState.setNeedRefresh],
    updateServiceWorker: pwaState.updateServiceWorker
  })
}));

beforeEach(() => {
  pwaState.offlineReady = false;
  pwaState.needRefresh = false;
  vi.clearAllMocks();
});

it("avisa quando a aplicação está pronta para uso offline", async () => {
  const user = userEvent.setup();
  pwaState.offlineReady = true;
  render(<PwaPrompt />);

  expect(screen.getByText("Aplicativo pronto para uso offline")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Fechar" }));
  expect(pwaState.setOfflineReady).toHaveBeenCalledWith(false);
});

it("aplica uma nova versão somente após confirmação", async () => {
  const user = userEvent.setup();
  pwaState.needRefresh = true;
  render(<PwaPrompt />);

  expect(screen.getByText("Nova versão disponível")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Atualizar agora" }));
  expect(pwaState.updateServiceWorker).toHaveBeenCalledWith(true);
});
