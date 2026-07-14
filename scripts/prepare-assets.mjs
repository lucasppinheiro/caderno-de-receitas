import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDirectory = path.join(root, "public");
const imageDirectory = path.join(publicDirectory, "images");

const images = [
  {
    slug: "feijoada",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Feijoada_%C3%A0_brasileira_3.jpg"
  },
  {
    slug: "coxinha",
    url: "https://live.staticflickr.com/147/347193328_dceb9ac52d_b.jpg"
  },
  {
    slug: "pao-de-queijo",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/50/P%C3%A3o_de_Queijo_%28Brazilian_Cheese_Bread%29.jpg"
  },
  {
    slug: "brigadeiro",
    url: "https://live.staticflickr.com/21/31394483_609cb15a2f_o.jpg"
  },
  {
    slug: "moqueca-baiana",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Moqueca_de_peixe.jpg"
  },
  {
    slug: "baiao-de-dois",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Bai%C3%A3o_de_dois.jpg"
  },
  {
    slug: "pudim-de-leite",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Pudim_de_leite_%283544235183%29.jpg"
  },
  {
    slug: "bolo-de-cenoura",
    url: "https://live.staticflickr.com/3227/2811983350_ebfc753ab2_b.jpg"
  },
  {
    slug: "arroz-carreteiro",
    url: "https://upload.wikimedia.org/wikipedia/commons/1/14/Arroz_carreteiro.jpg"
  },
  {
    slug: "bolinho-de-chuva",
    url: "https://live.staticflickr.com/361/19837637871_1577e670d4_b.jpg"
  },
  {
    slug: "canjica-cremosa",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Canjica_com_amendoim.jpg"
  },
  {
    slug: "quindim",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Quindim.jpg"
  }
];

const iconSvg = (size) =>
  Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
    <rect width="512" height="512" rx="112" fill="#174b85"/>
    <rect x="116" y="116" width="280" height="280" rx="36" fill="#f9c80e" stroke="#102b3f" stroke-width="16"/>
    <text x="256" y="338" text-anchor="middle" font-family="Arial, sans-serif" font-size="226" font-weight="900" fill="#102b3f">C</text>
  </svg>
`);

const ogSvg = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#f7f2e8"/>
    <rect width="1200" height="76" fill="#174b85"/>
    <rect x="824" y="118" width="270" height="270" rx="36" fill="#f9c80e" stroke="#102b3f" stroke-width="12"/>
    <text x="959" y="326" text-anchor="middle" font-family="Arial, sans-serif" font-size="190" font-weight="900" fill="#102b3f">C</text>
    <rect x="824" y="424" width="270" height="34" fill="#14643f"/>
    <text x="94" y="212" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="#a93422">CATÁLOGO</text>
    <text x="94" y="315" font-family="Arial, sans-serif" font-size="74" font-weight="900" fill="#102b3f">Caderno de</text>
    <text x="94" y="397" font-family="Arial, sans-serif" font-size="84" font-weight="900" fill="#102b3f">Receitas</text>
    <text x="94" y="476" font-family="Arial, sans-serif" font-size="28" fill="#405563">Ingredientes, modo de preparo, fontes e créditos.</text>
  </svg>
`);

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function download(url) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Caderno-de-Receitas/1.0 (asset preparation; contact via repository owner)"
      }
    });

    if (response.ok) {
      return Buffer.from(await response.arrayBuffer());
    }

    if (response.status !== 429) {
      throw new Error(`Falha ao baixar ${url}: ${response.status}`);
    }

    const retryAfterHeader = response.headers.get("retry-after");
    const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : Number.NaN;
    await wait(Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 3000);
  }

  const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=1600&output=jpg&q=92`;
  const proxyResponse = await fetch(proxyUrl, {
    headers: { "User-Agent": "Caderno-de-Receitas/1.0 (licensed asset preparation fallback)" }
  });

  if (!proxyResponse.ok) {
    throw new Error(`Falha ao baixar ${url} pela origem e pelo fallback: ${proxyResponse.status}`);
  }

  return Buffer.from(await proxyResponse.arrayBuffer());
}

async function prepareRecipeImages() {
  await mkdir(imageDirectory, { recursive: true });

  for (const image of images) {
    const outputPaths = [480, 960].map((width) =>
      path.join(imageDirectory, `${image.slug}-${width}.webp`)
    );
    const outputsExist = await Promise.all(
      outputPaths.map((outputPath) =>
        access(outputPath)
          .then(() => true)
          .catch(() => false)
      )
    );

    if (outputsExist.every(Boolean) && !image.replace) {
      continue;
    }

    const source = await download(image.url);

    for (const width of [480, 960]) {
      await sharp(source)
        .resize(width, Math.round(width * 0.75), {
          fit: "cover",
          position: sharp.strategy.attention
        })
        .webp({ quality: 78, effort: 6 })
        .toFile(path.join(imageDirectory, `${image.slug}-${width}.webp`));
    }

    await wait(800);
  }
}

async function prepareBrandAssets() {
  await mkdir(publicDirectory, { recursive: true });
  await writeFile(path.join(publicDirectory, "favicon.svg"), iconSvg(512));
  await sharp(iconSvg(512))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDirectory, "pwa-192x192.png"));
  await sharp(iconSvg(512))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDirectory, "pwa-512x512.png"));
  await sharp(iconSvg(512))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDirectory, "pwa-maskable-512x512.png"));
  await sharp(iconSvg(512))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDirectory, "apple-touch-icon.png"));
  await sharp(ogSvg).png({ quality: 86 }).toFile(path.join(publicDirectory, "og-cover.png"));
}

await Promise.all([prepareRecipeImages(), prepareBrandAssets()]);
console.log(`Ativos preparados: ${images.length * 2} imagens responsivas e identidade PWA.`);
