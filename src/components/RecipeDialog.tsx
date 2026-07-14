import { useEffect, useRef } from "react";
import { formatDuration } from "../lib/catalog";
import { recipeImageSources } from "../lib/images";
import type { Recipe } from "../types";
import styles from "../styles/App.module.css";

interface RecipeDialogProps {
  recipe: Recipe;
  onRequestClose: () => void;
}

export function RecipeDialog({ recipe, onRequestClose }: RecipeDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const image = recipeImageSources(recipe.image);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    closeButtonRef.current?.focus();

    return () => {
      if (dialog.open && typeof dialog.close === "function") dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="recipe-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onRequestClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onRequestClose();
      }}
    >
      <article className={styles.dialogPanel}>
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          type="button"
          onClick={onRequestClose}
          aria-label={`Fechar receita: ${recipe.name}`}
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className={styles.dialogImageWrap}>
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes="(max-width: 720px) 100vw, 760px"
            width={960}
            height={720}
            alt={`Prato de ${recipe.name}`}
          />
        </div>
        <div className={styles.dialogContent}>
          <p className={styles.eyebrow}>{recipe.category}</p>
          <h2 id="recipe-dialog-title">{recipe.name}</h2>
          <p className={styles.dialogSummary}>{recipe.summary}</p>
          <dl className={styles.dialogMeta}>
            <div>
              <dt>Tempo</dt>
              <dd>{formatDuration(recipe.timeMinutes)}</dd>
            </div>
            <div>
              <dt>Rendimento</dt>
              <dd>
                {recipe.servings} {recipe.servingLabel}
              </dd>
            </div>
            <div>
              <dt>Dificuldade</dt>
              <dd>{recipe.difficulty}</dd>
            </div>
          </dl>

          <div className={styles.recipeColumns}>
            <section aria-labelledby="ingredients-title">
              <h3 id="ingredients-title">Ingredientes</h3>
              <ul className={styles.ingredients}>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="steps-title">
              <h3 id="steps-title">Modo de preparo</h3>
              <ol className={styles.steps}>
                {recipe.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          </div>

          <footer className={styles.recipeReferences}>
            <h3>Fontes e créditos</h3>
            <p>
              <strong>Fontes consultadas:</strong>{" "}
              {recipe.sources.map((recipeSource, index) => (
                <span key={recipeSource.url}>
                  {index > 0 ? ", " : ""}
                  <a href={recipeSource.url} target="_blank" rel="noreferrer">
                    {recipeSource.publisher}: {recipeSource.title}
                  </a>
                  , acesso em {recipeSource.accessedAt.split("-").reverse().join("/")}.
                </span>
              ))}
            </p>
            <p>
              Imagem “{recipe.image.attribution.title}”, por{" "}
              <a href={recipe.image.attribution.sourceUrl} target="_blank" rel="noreferrer">
                {recipe.image.attribution.author}
              </a>
              , sob{" "}
              <a href={recipe.image.attribution.licenseUrl} target="_blank" rel="noreferrer">
                {recipe.image.attribution.license}
              </a>
              . {recipe.image.attribution.transformations}
            </p>
          </footer>
        </div>
      </article>
    </dialog>
  );
}
