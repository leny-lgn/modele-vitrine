#!/usr/bin/env node
// Captures d'écran des modèles pour l'annuaire du site personnel.
// Sert dist/ en local, ouvre chaque modèle de démo et enregistre :
//   public/images/accueil/<slug>-bureau.webp  (1280 × 800 vu à 1,25 → 1600 × 1000)
//   public/images/accueil/<slug>-mobile.webp  (375 × 600 vu à 2 → 750 × 1200)
// puis l'image de partage de l'accueil (Open Graph) :
//   public/images/accueil/partage.jpg         (1200 × 630), à régénérer après avoir rempli le nom dans moi.json
// Prérequis : `npm run build` (le script le rappelle si dist/ manque) et le paquet
// playwright-core (`npm install -D playwright-core`) ; le navigateur utilisé est Chrome
// installé sur la machine, sinon le Chromium de Playwright s'il est présent.
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import sharp from 'sharp';
import { RACINE } from '../src/lib/images.mjs';

const DIST = join(RACINE, 'dist');
const SORTIE = join(RACINE, 'public/images/accueil');
const VUES = {
  bureau: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1.25 },
  mobile: { viewport: { width: 375, height: 600 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.glb': 'model/gltf-binary',
};

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/ est vide : lancer d’abord `npm run build`.');
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import('playwright-core'));
} catch {
  console.error('playwright-core manque : lancer `npm install -D playwright-core`, puis relancer `npm run captures`.');
  process.exit(1);
}

// Modèles de démo : un fichier src/sites/*.json avec demo: true (fichiers « _ » ignorés).
const dossierSites = join(RACINE, 'src/sites');
const slugs = readdirSync(dossierSites)
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .map((f) => JSON.parse(readFileSync(join(dossierSites, f), 'utf8')))
  .filter((s) => s.demo)
  .map((s) => s.slug)
  .sort();

// Petit serveur statique sur dist/ (format « répertoire » : /x/ → /x/index.html).
const serveur = createServer((req, res) => {
  let chemin = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (chemin.endsWith('/')) chemin += 'index.html';
  const fichier = join(DIST, chemin);
  if (!fichier.startsWith(DIST) || !existsSync(fichier) || !statSync(fichier).isFile()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'content-type': TYPES[extname(fichier)] ?? 'application/octet-stream' });
  res.end(readFileSync(fichier));
});
await new Promise((ok) => serveur.listen(0, '127.0.0.1', ok));
const base = `http://127.0.0.1:${serveur.address().port}`;

let navigateur;
try {
  navigateur = await chromium.launch({ channel: 'chrome' });
} catch {
  navigateur = await chromium.launch();
}

mkdirSync(SORTIE, { recursive: true });
let n = 0;
try {
  for (const slug of slugs) {
    for (const [vue, options] of Object.entries(VUES)) {
      const contexte = await navigateur.newContext({ ...options, reducedMotion: 'reduce', locale: 'fr-FR' });
      const page = await contexte.newPage();
      await page.goto(`${base}/modeles/${slug}/`, { waitUntil: 'networkidle' });
      // Le menu « Modèles » appartient à la démo, pas au site montré.
      await page.addStyleTag({ content: '.menu-modeles{display:none!important}' });
      await page.evaluate(() => document.fonts.ready);
      const png = await page.screenshot({ type: 'png' });
      const cible = join(SORTIE, `${slug}-${vue}.webp`);
      await sharp(png).webp({ quality: 80 }).toFile(cible);
      console.log(`  ${cible.replace(RACINE + '/', '')}`);
      n++;
      await contexte.close();
    }
  }

  // Image de partage de l'accueil : rubrique d'annuaire + annonce, avec la capture d'un modèle.
  const moi = JSON.parse(readFileSync(join(RACINE, 'src/data/moi.json'), 'utf8'));
  const manque = (v) => !v || /\[À COMPLÉTER/.test(v);
  const echapper = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const villes = moi.villes.length > 1 ? `${moi.villes.slice(0, -1).join(', ')} et ${moi.villes.at(-1)}` : moi.villes[0];
  const nom = !manque(moi.nomCommercial) ? moi.nomCommercial : !manque(moi.nom) ? moi.nom : '';
  const titre = nom || 'Sites internet pour commerçants et artisans';
  const sousTitre = nom ? 'Sites internet pour commerçants et artisans' : 'Trois gammes de site, des modèles à parcourir';
  // Logo clair (fond sombre) s'il est déclaré dans moi.json, sinon le nom en texte.
  const logo = moi.logo?.clair;
  const vitrine = slugs.find((s) => s.endsWith('-vitrine')) ?? slugs[0];
  const contexte = await navigateur.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const page = await contexte.newPage();
  await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  await page.setContent(
    `<!doctype html><html lang="fr"><head><base href="${base}/"><style>
      @font-face{font-family:'Libre Franklin';src:url('/fonts/libre-franklin-variable.woff2') format('woff2');font-weight:100 900}
      *{margin:0;box-sizing:border-box}
      body{width:1200px;height:630px;background:#151a1c;color:#efe8d8;font-family:'Libre Franklin',sans-serif;padding:48px 56px;display:flex;flex-direction:column;overflow:hidden}
      .r{display:flex;justify-content:space-between;align-items:baseline;background:#0e1214;color:#c9a44c;border-bottom:3px solid #c9a44c;padding:14px 22px 12px;font-weight:800;font-size:44px;line-height:1.05;text-transform:uppercase;letter-spacing:-.01em}
      .r span{font-weight:500;font-size:24px;text-transform:none;letter-spacing:0}
      .a{flex:1;display:grid;grid-template-columns:1fr 470px;border:3px solid #c9a44c;border-top:0;background:#1f2629}
      .q{padding:34px 36px;display:flex;flex-direction:column;justify-content:flex-end;gap:18px}
      .logo{display:block;width:430px;height:auto}
      h1{font-size:${nom ? 72 : 54}px;font-weight:800;letter-spacing:-.03em;line-height:1;text-wrap:balance}
      p{font-size:27px;line-height:1.3;color:#bdb6a8;max-width:22ch}
      .c{border-left:1px solid #efe8d8;padding:26px;display:flex;align-items:center}
      .c img{width:100%;border:1px solid #efe8d8;display:block}
    </style></head><body>
      <div class="r">Sites internet<span>${echapper(villes)}</span></div>
      <div class="a">
        <div class="q">${
          logo
            ? `<img class="logo" src="/images/marque/${logo}" alt="">`
            : `<h1>${echapper(titre)}</h1>`
        }<p>${echapper(sousTitre)}</p></div>
        ${vitrine ? `<div class="c"><img src="/images/accueil/${vitrine}-bureau.webp" alt=""></div>` : ''}
      </div>
    </body></html>`,
    { waitUntil: 'networkidle' },
  );
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  const cible = join(SORTIE, 'partage.jpg');
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(cible);
  console.log(`  ${cible.replace(RACINE + '/', '')}`);
  n++;
  await contexte.close();
} finally {
  await navigateur.close();
  serveur.close();
}
console.log(`Captures : ${n} fichier(s). Relancer \`npm run build\` pour les intégrer (variantes srcset).`);
