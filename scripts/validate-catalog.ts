import { stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { recipes } from "../src/data/recipes";
import { validateCatalog } from "../src/lib/catalog";

const errors = validateCatalog(recipes);
let imageBytes = 0;

for (const recipe of recipes) {
  for (const width of [480, 960]) {
    const imagePath = path.join(process.cwd(), "public", `${recipe.image.basePath}-${width}.webp`);

    try {
      const imageStat = await stat(imagePath);
      const metadata = await sharp(imagePath).metadata();
      imageBytes += imageStat.size;

      if (
        metadata.format !== "webp" ||
        metadata.width !== width ||
        metadata.height !== width * 0.75
      ) {
        errors.push(`${recipe.slug}: imagem ${width} px não corresponde ao contrato WebP 4:3.`);
      }
    } catch {
      errors.push(`${recipe.slug}: imagem local ${width} px ausente.`);
    }
  }
}

if (imageBytes > 6 * 1024 * 1024) {
  errors.push(`As imagens ocupam ${(imageBytes / 1024 / 1024).toFixed(2)} MiB; o limite é 6 MiB.`);
}

if (errors.length > 0) {
  console.error(["Catálogo inválido:", ...errors.map((error) => `- ${error}`)].join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Catálogo válido: ${recipes.length} receitas e ${(imageBytes / 1024 / 1024).toFixed(2)} MiB de imagens.`
  );
}
