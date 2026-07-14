# Caderno de Receitas

[Ver demonstração](https://lucasppinheiro.github.io/caderno-de-receitas/)

![Página inicial do Caderno de Receitas](docs/interface.jpg)

PWA de receitas brasileiras construída com React, Vite e TypeScript. O projeto combina uma interface responsiva com catálogo validado no build, funcionamento offline e testes automatizados de comportamento e acessibilidade.

## Funcionalidades

- busca normalizada, filtros por categoria e ocasião e ordenação por nome ou tempo;
- paginação progressiva de oito receitas por vez;
- receitas completas em diálogo acessível, com navegação por teclado e restauração de foco;
- links diretos por `?receita=<slug>`, sincronizados com a History API;
- instalação como PWA e catálogo disponível offline após o primeiro acesso;
- imagens locais responsivas em WebP, sem requisições de terceiros em tempo de execução.

## Decisões técnicas

- React com TypeScript estrito e CSS Modules;
- funções puras para normalização, busca, filtros, ordenação, paginação e URLs;
- estado da receita selecionada refletido na URL sem dependência de roteador;
- validação de dados executada antes do build, incluindo campos obrigatórios, slugs, fontes, licenças e arquivos de imagem;
- service worker gerado pelo Workbox por meio do `vite-plugin-pwa`;
- ativos, fontes e imagens hospedados localmente;
- Content Security Policy e política de referência declaradas no HTML.

## Qualidade e testes

O projeto usa Vitest e React Testing Library para unidades e componentes, além de Playwright e axe para os fluxos completos no desktop e no celular.

```bash
npm run check
npm run test:e2e
npm run audit
```

Esses comandos verificam formatação, lint, tipos, integridade do catálogo, testes, build, navegação por teclado, links diretos, histórico, acessibilidade, funcionamento offline, limite de transferência e ausência de requisições externas. O workflow do GitHub Actions executa as mesmas verificações antes da publicação e utiliza permissões mínimas e ações fixadas por SHA.

## Execução local

Requisitos: Node.js 24 LTS e npm.

```bash
npm ci
npm run dev
```

O Vite informa a URL local no terminal. A versão publicada utiliza a base `/caderno-de-receitas/`.

## Estrutura

```text
src/components/  componentes de interface
src/data/        catálogo de receitas
src/lib/         busca, ordenação, URLs, imagens e validação
scripts/         preparação de ativos e validação do catálogo
public/          manifest, ícones e imagens locais
tests/           testes de navegador e acessibilidade
```

## Fontes e imagens

Cada receita possui uma fonte culinária identificada. As imagens aceitas usam licenças Public Domain, CC0, CC BY ou CC BY-SA e têm autoria, página original, licença e transformações documentadas em [CREDITS.md](CREDITS.md).

## Publicação

O workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) valida o projeto e publica o diretório `dist/` no GitHub Pages após alterações na branch `main`.
