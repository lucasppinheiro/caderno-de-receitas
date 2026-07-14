import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { recipes } from "../data/recipes";
import { formatDuration } from "../lib/catalog";
import { RecipeDialog } from "./RecipeDialog";

describe("RecipeDialog", () => {
  it("exibe os dados completos das doze receitas", () => {
    for (const recipe of recipes) {
      const { unmount } = render(<RecipeDialog recipe={recipe} onRequestClose={vi.fn()} />);
      const dialog = screen.getByRole("dialog", { name: recipe.name });
      const content = within(dialog);

      expect(content.getByText(recipe.category)).toBeInTheDocument();
      expect(content.getByText(recipe.summary)).toBeInTheDocument();
      expect(content.getByText(formatDuration(recipe.timeMinutes))).toBeInTheDocument();
      expect(content.getByText(`${recipe.servings} ${recipe.servingLabel}`)).toBeInTheDocument();
      expect(content.getByText(recipe.difficulty)).toBeInTheDocument();

      const ingredients = content.getByRole("region", { name: "Ingredientes" });
      const steps = content.getByRole("region", { name: "Modo de preparo" });
      expect(within(ingredients).getAllByRole("listitem")).toHaveLength(recipe.ingredients.length);
      expect(within(steps).getAllByRole("listitem")).toHaveLength(recipe.steps.length);

      for (const source of recipe.sources) {
        expect(
          content.getByRole("link", { name: `${source.publisher}: ${source.title}` })
        ).toHaveAttribute("href", source.url);
      }
      expect(content.getByRole("link", { name: recipe.image.attribution.author })).toHaveAttribute(
        "href",
        recipe.image.attribution.sourceUrl
      );
      expect(content.getByRole("link", { name: recipe.image.attribution.license })).toHaveAttribute(
        "href",
        recipe.image.attribution.licenseUrl
      );

      unmount();
    }
  });
});
