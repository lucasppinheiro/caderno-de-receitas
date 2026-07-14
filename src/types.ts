export const DIFFICULTIES = ["Fácil", "Média", "Avançada"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];
export type GeographicType = "cidade" | "estado" | "região" | "país";
export type SortOrder = "featured" | "name" | "time";

export interface RecipeSource {
  title: string;
  publisher: string;
  url: string;
  accessedAt: string;
  supports: Array<"ingredientes" | "preparo" | "origem">;
}

export interface VerifiedOrigin {
  locality: string;
  geographicType: GeographicType;
  source: RecipeSource;
}

export interface ImageAttribution {
  author: string;
  title: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  transformations: string;
}

export interface RecipeImage {
  basePath: string;
  width: number;
  height: number;
  attribution: ImageAttribution;
}

export interface Recipe {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  timeMinutes: number;
  servings: number;
  servingLabel: string;
  difficulty: Difficulty;
  ingredients: string[];
  steps: string[];
  tags: string[];
  image: RecipeImage;
  sources: RecipeSource[];
  origin?: VerifiedOrigin;
}

export interface CatalogState {
  search: string;
  category: string;
  tag: string;
  sort: SortOrder;
  selectedRecipe: Recipe | null;
  visibleCount: number;
}
