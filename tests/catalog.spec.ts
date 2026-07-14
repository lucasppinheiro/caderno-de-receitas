import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { recipes } from "../src/data/recipes";

test("busca, paginação, diálogo, teclado e histórico", async ({ page }) => {
  await page.goto("./");
  await expect(page).toHaveTitle("Caderno de Receitas | Receitas brasileiras");
  await expect(page.getByRole("link", { name: "Caderno de Receitas, início" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Receitas brasileiras");
  await expect(page.getByRole("button", { name: /Abrir receita:/ })).toHaveCount(8);

  await page.getByRole("button", { name: "Mostrar mais receitas" }).click();
  await expect(page.getByRole("button", { name: /Abrir receita:/ })).toHaveCount(12);

  await page.getByRole("searchbox", { name: "Buscar receita" }).fill("pao");
  await expect(page.getByText("1 receita encontrada")).toBeVisible();
  await page.getByRole("button", { name: "Abrir receita: Pão de queijo" }).click();
  await expect(page).toHaveURL(/receita=pao-de-queijo/);
  await expect(page.getByRole("dialog", { name: "Pão de queijo" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page).not.toHaveURL(/receita=/);
  await expect(page.getByRole("button", { name: "Abrir receita: Pão de queijo" })).toBeFocused();
});

test("link direto, slug inválido e botão voltar", async ({ page }) => {
  await page.goto("./?receita=quindim");
  await expect(page.getByRole("dialog", { name: "Quindim" })).toBeVisible();
  await page.getByRole("button", { name: "Fechar receita: Quindim" }).click();
  await expect(page).not.toHaveURL(/receita=/);

  await page.getByRole("button", { name: "Abrir receita: Feijoada" }).click();
  await expect(page.getByRole("dialog", { name: "Feijoada" })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("dialog")).toBeHidden();

  await page.goto("./?receita=nao-existe");
  await expect(page).not.toHaveURL(/receita=/);
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("não apresenta violações sérias ou críticas de acessibilidade", async ({ page }) => {
  await page.goto("./");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const severeViolations = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? "")
  );

  expect(severeViolations).toEqual([]);
});

test("limita a transferência inicial a 1,5 MiB", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Métrica exclusiva da carga mobile.");
  await page.goto("./");
  await page.waitForLoadState("networkidle");
  const transferredBytes = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .map((entry) => entry as PerformanceResourceTiming)
      .reduce((total, entry) => total + entry.transferSize, 0)
  );

  expect(transferredBytes).toBeLessThanOrEqual(1.5 * 1024 * 1024);
});

test("funciona offline e abre todas as receitas e imagens", async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "Cobertura offline executada uma vez.");

  await page.goto("./");
  await page.evaluate(async () => navigator.serviceWorker.ready);
  await page.reload();
  await expect
    .poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller)))
    .toBe(true);
  await context.setOffline(true);

  for (const recipe of recipes) {
    await page.goto(`./?receita=${recipe.slug}`);
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: recipe.name })).toBeVisible();
    await expect(
      dialog.getByRole("region", { name: "Ingredientes" }).getByRole("listitem")
    ).toHaveCount(recipe.ingredients.length);
    await expect(
      dialog.getByRole("region", { name: "Modo de preparo" }).getByRole("listitem")
    ).toHaveCount(recipe.steps.length);
    await expect(dialog.getByRole("heading", { name: "Fontes e créditos" })).toBeVisible();
    await expect
      .poll(() =>
        dialog
          .locator("img")
          .evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)
      )
      .toBe(true);
  }

  await context.setOffline(false);
});

test("não realiza requisições para serviços de terceiros", async ({ page }) => {
  const externalRequests: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.hostname !== "127.0.0.1") externalRequests.push(request.url());
  });

  await page.goto("./");
  await page.waitForLoadState("networkidle");
  expect(externalRequests).toEqual([]);
});

test("mantém a página mobile inicial dentro de aproximadamente oito viewports", async ({
  page
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile-chromium",
    "Métrica exclusiva da visualização mobile."
  );
  await page.goto("./");
  const ratio = await page.evaluate(
    () => document.documentElement.scrollHeight / window.innerHeight
  );
  expect(ratio).toBeLessThanOrEqual(8.5);
});
