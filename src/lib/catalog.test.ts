import { describe, expect, it } from "vitest";
import { recipes } from "../data/recipes";
import {
  buildRecipeUrl,
  filterAndSortRecipes,
  formatDuration,
  getRecipeSlugFromUrl,
  normalizeText,
  validateCatalog
} from "./catalog";

const defaultFilters = {
  search: "",
  category: "all",
  tag: "all",
  sort: "featured" as const
};

describe("catálogo", () => {
  it("normaliza acentos, caixa e espaços", () => {
    expect(normalizeText("  PÃO de Queijo  ")).toBe("pao de queijo");
  });

  it("busca em nome, resumo, categoria e tags", () => {
    expect(filterAndSortRecipes(recipes, { ...defaultFilters, search: "pao" })).toHaveLength(1);
    expect(
      filterAndSortRecipes(recipes, { ...defaultFilters, search: "panela unica" })
    ).toHaveLength(3);
  });

  it("combina categoria e tag", () => {
    const result = filterAndSortRecipes(recipes, {
      ...defaultFilters,
      category: "Doces",
      tag: "Para compartilhar"
    });

    expect(result.map((recipe) => recipe.slug)).toEqual(["brigadeiro", "canjica-cremosa"]);
  });

  it("ordena por nome e por menor tempo sem alterar a entrada", () => {
    const originalFirst = recipes[0];
    const alphabetical = filterAndSortRecipes(recipes, { ...defaultFilters, sort: "name" });
    const fastest = filterAndSortRecipes(recipes, { ...defaultFilters, sort: "time" });

    expect(alphabetical[0]?.name).toBe("Arroz carreteiro");
    expect(fastest[0]?.slug).toBe("bolinho-de-chuva");
    expect(recipes[0]).toBe(originalFirst);
  });

  it("lê e escreve o slug sem descartar outros parâmetros", () => {
    const nextUrl = buildRecipeUrl(
      "https://example.test/caderno-de-receitas/?utm=teste",
      "quindim"
    );
    expect(nextUrl).toBe("/caderno-de-receitas/?utm=teste&receita=quindim");
    expect(getRecipeSlugFromUrl(`https://example.test${nextUrl}`)).toBe("quindim");
    expect(buildRecipeUrl(`https://example.test${nextUrl}`)).toBe(
      "/caderno-de-receitas/?utm=teste"
    );
  });

  it("formata durações em minutos e horas", () => {
    expect(formatDuration(40)).toBe("40 min");
    expect(formatDuration(60)).toBe("1 h");
    expect(formatDuration(85)).toBe("1 h 25 min");
  });

  it("aceita o catálogo completo e rejeita slug duplicado", () => {
    expect(validateCatalog(recipes)).toEqual([]);

    const invalidCatalog = structuredClone(recipes);
    invalidCatalog[1]!.slug = invalidCatalog[0]!.slug;
    expect(validateCatalog(invalidCatalog)).toContain("feijoada: slug duplicado.");
  });
});
