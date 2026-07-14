import { useEffect, useMemo, useRef, useState } from "react";
import { PwaPrompt } from "./components/PwaPrompt";
import { RecipeCard } from "./components/RecipeCard";
import { RecipeDialog } from "./components/RecipeDialog";
import { recipes } from "./data/recipes";
import {
  buildRecipeUrl,
  filterAndSortRecipes,
  formatDuration,
  getRecipeSlugFromUrl,
  PAGE_SIZE
} from "./lib/catalog";
import { recipeImageSources } from "./lib/images";
import type { Recipe, SortOrder } from "./types";
import styles from "./styles/App.module.css";

const findRecipeFromUrl = (): Recipe | null => {
  const slug = getRecipeSlugFromUrl(window.location.href);
  const recipe = slug ? recipes.find((item) => item.slug === slug) : undefined;

  if (slug && !recipe) {
    window.history.replaceState({}, "", buildRecipeUrl(window.location.href));
  }

  return recipe ?? null;
};

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState<SortOrder>("featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(findRecipeFromUrl);
  const lastFocusedElement = useRef<HTMLButtonElement | null>(null);
  const previousRecipe = useRef<Recipe | null>(selectedRecipe);

  const categories = useMemo(
    () =>
      [...new Set(recipes.map((recipe) => recipe.category))].sort((a, b) =>
        a.localeCompare(b, "pt-BR")
      ),
    []
  );
  const tags = useMemo(
    () =>
      [...new Set(recipes.flatMap((recipe) => recipe.tags))].sort((a, b) =>
        a.localeCompare(b, "pt-BR")
      ),
    []
  );
  const filteredRecipes = useMemo(
    () => filterAndSortRecipes(recipes, { search, category, tag, sort }),
    [search, category, tag, sort]
  );
  const visibleRecipes = filteredRecipes.slice(0, visibleCount);
  const heroRecipe = recipes.find((recipe) => recipe.slug === "moqueca-baiana") ?? null;
  const heroImage = heroRecipe ? recipeImageSources(heroRecipe.image) : null;

  const resetVisibleCount = () => setVisibleCount(PAGE_SIZE);

  useEffect(() => {
    const handlePopState = () => {
      const slug = getRecipeSlugFromUrl(window.location.href);
      const recipe = slug ? recipes.find((item) => item.slug === slug) : undefined;

      if (slug && !recipe) {
        window.history.replaceState({}, "", buildRecipeUrl(window.location.href));
      }

      setSelectedRecipe(recipe ?? null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (previousRecipe.current && !selectedRecipe) {
      window.requestAnimationFrame(() => lastFocusedElement.current?.focus());
    }
    previousRecipe.current = selectedRecipe;
  }, [selectedRecipe]);

  const openRecipe = (recipe: Recipe, trigger: HTMLButtonElement) => {
    lastFocusedElement.current = trigger;
    window.history.pushState(
      { recipeModal: true },
      "",
      buildRecipeUrl(window.location.href, recipe.slug)
    );
    setSelectedRecipe(recipe);
  };

  const closeRecipe = () => {
    if (window.history.state?.recipeModal === true) {
      window.history.back();
      return;
    }

    window.history.replaceState({}, "", buildRecipeUrl(window.location.href));
    setSelectedRecipe(null);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setTag("all");
    setSort("featured");
    resetVisibleCount();
  };

  return (
    <>
      <a className={styles.skipLink} href="#catalogo">
        Ir para o catálogo
      </a>
      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <a
            className={styles.brand}
            href={import.meta.env.BASE_URL}
            aria-label="Caderno de Receitas, início"
          >
            <span aria-hidden="true">C</span>
            Caderno de Receitas
          </a>
          <nav aria-label="Navegação principal">
            <a href="#catalogo">Receitas</a>
            <a href="#sobre">Sobre</a>
          </nav>
          <p className={styles.offlineClaim}>Disponível offline após o primeiro acesso</p>
        </div>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Catálogo</p>
              <h1 id="hero-title">Receitas brasileiras</h1>
              <p>
                Busque pelo nome ou use os filtros. Abra uma receita para consultar ingredientes,
                modo de preparo, fontes e créditos da imagem.
              </p>
              <a className={styles.primaryAction} href="#catalogo">
                Ver receitas
              </a>
            </div>
            {heroRecipe && heroImage && (
              <figure className={styles.heroFigure}>
                <img
                  src={heroImage.src}
                  srcSet={heroImage.srcSet}
                  sizes="(max-width: 900px) calc(100vw - 2rem), 24rem"
                  width={960}
                  height={720}
                  loading="eager"
                  fetchPriority="high"
                  alt=""
                />
                <figcaption className={styles.heroCaption}>
                  <strong>{heroRecipe.name}</strong>
                  <span>{formatDuration(heroRecipe.timeMinutes)}</span>
                </figcaption>
              </figure>
            )}
          </div>
        </section>

        <section className={styles.catalog} id="catalogo" aria-labelledby="catalog-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Receitas</p>
              <h2 id="catalog-title">Escolha uma receita</h2>
            </div>
            <p className={styles.resultCount} aria-live="polite" aria-atomic="true">
              {filteredRecipes.length}{" "}
              {filteredRecipes.length === 1 ? "receita encontrada" : "receitas encontradas"}
            </p>
          </div>

          <form className={styles.filters} onSubmit={(event) => event.preventDefault()}>
            <label className={styles.searchField}>
              <span>Buscar receita</span>
              <input
                type="search"
                value={search}
                placeholder="Ex.: bolo, panela única"
                onChange={(event) => {
                  setSearch(event.target.value);
                  resetVisibleCount();
                }}
              />
            </label>
            <label>
              <span>Categoria</span>
              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  resetVisibleCount();
                }}
              >
                <option value="all">Todas</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Ocasião ou preparo</span>
              <select
                value={tag}
                onChange={(event) => {
                  setTag(event.target.value);
                  resetVisibleCount();
                }}
              >
                <option value="all">Todos</option>
                {tags.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Ordenar por</span>
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value as SortOrder);
                  resetVisibleCount();
                }}
              >
                <option value="featured">Ordem padrão</option>
                <option value="name">Nome</option>
                <option value="time">Menor tempo</option>
              </select>
            </label>
          </form>

          {visibleRecipes.length > 0 ? (
            <>
              <div className={styles.grid}>
                {visibleRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} onOpen={openRecipe} />
                ))}
              </div>
              {visibleCount < filteredRecipes.length && (
                <div className={styles.loadMoreWrap}>
                  <button
                    className={styles.secondaryAction}
                    type="button"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  >
                    Mostrar mais receitas
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Nenhuma receita combina com esses filtros.</p>
              <p>Tente outro termo ou volte ao catálogo completo.</p>
              <button className={styles.secondaryAction} type="button" onClick={clearFilters}>
                Limpar filtros
              </button>
            </div>
          )}
        </section>

        <section className={styles.about} id="sobre" aria-labelledby="about-title">
          <div className={styles.aboutInner}>
            <h2 id="about-title">Sobre o catálogo</h2>
            <p>
              Cada receita apresenta ingredientes, modo de preparo, tempo, rendimento, fontes
              consultadas e créditos da imagem.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.siteFooter}>
        <p>
          <strong>Caderno de Receitas</strong>
        </p>
        <p className={styles.footerStatus}>Disponível offline após o primeiro acesso</p>
        <a href="#catalogo">Voltar ao catálogo</a>
      </footer>

      {selectedRecipe && <RecipeDialog recipe={selectedRecipe} onRequestClose={closeRecipe} />}
      <PwaPrompt />
    </>
  );
}
