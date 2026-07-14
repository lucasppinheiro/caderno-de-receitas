import { formatDuration } from "../lib/catalog";
import { recipeImageSources } from "../lib/images";
import type { Recipe } from "../types";
import styles from "../styles/App.module.css";

interface RecipeCardProps {
  recipe: Recipe;
  onOpen: (recipe: Recipe, trigger: HTMLButtonElement) => void;
}

export function RecipeCard({ recipe, onOpen }: RecipeCardProps) {
  const image = recipeImageSources(recipe.image);

  return (
    <article className={styles.card}>
      <div className={styles.cardImageWrap}>
        <img
          className={styles.cardImage}
          src={image.src}
          srcSet={image.srcSet}
          sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 25vw"
          width={480}
          height={360}
          loading="lazy"
          decoding="async"
          alt=""
        />
        <span className={styles.category}>{recipe.category}</span>
      </div>
      <div className={styles.cardBody}>
        <h3>{recipe.name}</h3>
        <p>{recipe.summary}</p>
        <dl className={styles.meta}>
          <div>
            <dt>Tempo</dt>
            <dd>{formatDuration(recipe.timeMinutes)}</dd>
          </div>
          <div>
            <dt>Dificuldade</dt>
            <dd>{recipe.difficulty}</dd>
          </div>
        </dl>
        <button
          className={styles.cardAction}
          type="button"
          onClick={(event) => onOpen(recipe, event.currentTarget)}
          aria-label={`Abrir receita: ${recipe.name}`}
        >
          Abrir receita <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
