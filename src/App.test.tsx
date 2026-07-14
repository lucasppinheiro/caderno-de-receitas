import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { recipes } from "./data/recipes";
import { formatDuration } from "./lib/catalog";

vi.mock("virtual:pwa-register/react", () => ({
  useRegisterSW: () => ({
    offlineReady: [false, vi.fn()],
    needRefresh: [false, vi.fn()],
    updateServiceWorker: vi.fn()
  })
}));

describe("aplicação", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/caderno-de-receitas/");
  });

  it("mostra oito receitas e carrega o restante sob demanda", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getAllByRole("button", { name: /Abrir receita:/ })).toHaveLength(8);
    await user.click(screen.getByRole("button", { name: "Mostrar mais receitas" }));
    expect(screen.getAllByRole("button", { name: /Abrir receita:/ })).toHaveLength(12);
  });

  it("mantém os dados obrigatórios nos cartões das doze receitas", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Mostrar mais receitas" }));

    for (const recipe of recipes) {
      const action = screen.getByRole("button", { name: `Abrir receita: ${recipe.name}` });
      const card = action.closest("article");

      expect(card).not.toBeNull();
      const cardContent = within(card as HTMLElement);
      expect(cardContent.getByRole("heading", { name: recipe.name })).toBeInTheDocument();
      expect(cardContent.getByText(recipe.category)).toBeInTheDocument();
      expect(cardContent.getByText(recipe.summary)).toBeInTheDocument();
      expect(cardContent.getByText(formatDuration(recipe.timeMinutes))).toBeInTheDocument();
      expect(cardContent.getByText(recipe.difficulty)).toBeInTheDocument();
      expect(card?.querySelector("img")).toHaveAttribute(
        "src",
        expect.stringContaining(`${recipe.image.basePath}-480.webp`)
      );
    }
  });

  it("exibe a nova identidade no cabeçalho e no rodapé", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Caderno de Receitas, início" })).toBeInTheDocument();
    expect(screen.getAllByText("Caderno de Receitas")).toHaveLength(2);
  });

  it("filtra sem acento e exibe o estado vazio", async () => {
    const user = userEvent.setup();
    render(<App />);
    const search = screen.getByRole("searchbox", { name: "Buscar receita" });

    await user.type(search, "pao");
    expect(screen.getByText("1 receita encontrada")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pão de queijo" })).toBeInTheDocument();

    await user.clear(search);
    await user.type(search, "receita inexistente");
    expect(screen.getByText("Nenhuma receita combina com esses filtros.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
    expect(screen.getByText("12 receitas encontradas")).toBeInTheDocument();
  });

  it("abre o diálogo, sincroniza a URL e chama o histórico ao fechar", async () => {
    const user = userEvent.setup();
    const back = vi.spyOn(window.history, "back").mockImplementation(() => undefined);
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Abrir receita: Feijoada" }));
    expect(screen.getByRole("dialog", { name: "Feijoada" })).toBeInTheDocument();
    expect(new URL(window.location.href).searchParams.get("receita")).toBe("feijoada");

    await user.click(screen.getByRole("button", { name: "Fechar receita: Feijoada" }));
    expect(back).toHaveBeenCalledOnce();
  });

  it("abre link direto e remove o parâmetro ao fechar", async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, "", "/caderno-de-receitas/?receita=quindim");
    render(<App />);

    expect(screen.getByRole("dialog", { name: "Quindim" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Fechar receita: Quindim" }));

    expect(new URL(window.location.href).searchParams.has("receita")).toBe(false);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("limpa slug inexistente sem abrir conteúdo incompleto", async () => {
    window.history.replaceState({}, "", "/caderno-de-receitas/?receita=nao-existe");
    render(<App />);

    await waitFor(() =>
      expect(new URL(window.location.href).searchParams.has("receita")).toBe(false)
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
