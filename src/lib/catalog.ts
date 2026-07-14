import { DIFFICULTIES, type Recipe, type SortOrder } from "../types";

export const PAGE_SIZE = 8;

export const normalizeText = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();

export interface CatalogFilters {
  search: string;
  category: string;
  tag: string;
  sort: SortOrder;
}

export const filterAndSortRecipes = (
  recipes: Recipe[],
  { search, category, tag, sort }: CatalogFilters
): Recipe[] => {
  const normalizedSearch = normalizeText(search);

  const filtered = recipes.filter((recipe) => {
    const searchable = normalizeText(
      [recipe.name, recipe.summary, recipe.category, ...recipe.tags].join(" ")
    );
    const matchesSearch = normalizedSearch === "" || searchable.includes(normalizedSearch);
    const matchesCategory = category === "all" || recipe.category === category;
    const matchesTag = tag === "all" || recipe.tags.includes(tag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  return [...filtered].sort((left, right) => {
    if (sort === "name") {
      return left.name.localeCompare(right.name, "pt-BR");
    }

    if (sort === "time") {
      return left.timeMinutes - right.timeMinutes || left.name.localeCompare(right.name, "pt-BR");
    }

    return left.id.localeCompare(right.id, "pt-BR");
  });
};

export const getRecipeSlugFromUrl = (url: string): string | null =>
  new URL(url).searchParams.get("receita");

export const buildRecipeUrl = (url: string, slug?: string): string => {
  const nextUrl = new URL(url);

  if (slug) {
    nextUrl.searchParams.set("receita", slug);
  } else {
    nextUrl.searchParams.delete("receita");
  }

  return `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (remainingMinutes === 0) return `${hours} h`;
  return `${hours} h ${remainingMinutes} min`;
};

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

export const validateCatalog = (recipes: Recipe[]): string[] => {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();

  if (recipes.length === 0) errors.push("O catálogo não pode ficar vazio.");

  for (const recipe of recipes) {
    const prefix = recipe.slug || recipe.id || "receita sem identificador";

    if (!isNonEmpty(recipe.id)) errors.push(`${prefix}: identificador ausente.`);
    if (ids.has(recipe.id)) errors.push(`${prefix}: identificador duplicado.`);
    ids.add(recipe.id);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(recipe.slug)) {
      errors.push(`${prefix}: slug inválido.`);
    }
    if (slugs.has(recipe.slug)) errors.push(`${prefix}: slug duplicado.`);
    slugs.add(recipe.slug);

    for (const [field, value] of [
      ["nome", recipe.name],
      ["categoria", recipe.category],
      ["resumo", recipe.summary],
      ["rótulo de porção", recipe.servingLabel]
    ] as const) {
      if (!isNonEmpty(value)) errors.push(`${prefix}: ${field} ausente.`);
    }

    if (recipe.timeMinutes <= 0) errors.push(`${prefix}: tempo deve ser positivo.`);
    if (recipe.servings <= 0) errors.push(`${prefix}: porções devem ser positivas.`);
    if (!DIFFICULTIES.includes(recipe.difficulty)) errors.push(`${prefix}: dificuldade inválida.`);
    if (recipe.ingredients.length === 0 || recipe.ingredients.some((item) => !isNonEmpty(item))) {
      errors.push(`${prefix}: ingredientes incompletos.`);
    }
    if (recipe.steps.length === 0 || recipe.steps.some((item) => !isNonEmpty(item))) {
      errors.push(`${prefix}: etapas incompletas.`);
    }
    if (recipe.tags.length === 0 || recipe.tags.some((item) => !isNonEmpty(item))) {
      errors.push(`${prefix}: tags incompletas.`);
    }
    if (!recipe.image.basePath.startsWith("images/") || /^https?:/i.test(recipe.image.basePath)) {
      errors.push(`${prefix}: caminho da imagem deve ser local.`);
    }

    const attribution = recipe.image.attribution;
    for (const [field, value] of Object.entries(attribution)) {
      if (!isNonEmpty(value)) errors.push(`${prefix}: crédito de imagem sem ${field}.`);
    }
    if (!/^https:\/\//.test(attribution.sourceUrl)) {
      errors.push(`${prefix}: página original da imagem inválida.`);
    }
    if (!/^https:\/\//.test(attribution.licenseUrl)) {
      errors.push(`${prefix}: URL da licença inválida.`);
    }
    if (!/^(CC0|CC BY(?:-SA)?|Domínio público)/.test(attribution.license)) {
      errors.push(`${prefix}: licença de imagem não permitida.`);
    }

    if (recipe.sources.length === 0) errors.push(`${prefix}: fonte culinária ausente.`);
    for (const recipeSource of recipe.sources) {
      if (
        !isNonEmpty(recipeSource.title) ||
        !isNonEmpty(recipeSource.publisher) ||
        !/^https:\/\//.test(recipeSource.url) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(recipeSource.accessedAt) ||
        !recipeSource.supports.includes("ingredientes") ||
        !recipeSource.supports.includes("preparo")
      ) {
        errors.push(`${prefix}: fonte culinária incompleta.`);
      }
    }

    if (recipe.origin && !recipe.origin.source.supports.includes("origem")) {
      errors.push(`${prefix}: origem exibida sem fonte específica.`);
    }
  }

  return errors;
};
