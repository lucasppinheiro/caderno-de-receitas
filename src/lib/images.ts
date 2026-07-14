import type { RecipeImage } from "../types";

export const recipeImageSources = (image: RecipeImage) => {
  const base = `${import.meta.env.BASE_URL}${image.basePath}`;

  return {
    src: `${base}-480.webp`,
    srcSet: `${base}-480.webp 480w, ${base}-960.webp 960w`
  };
};
