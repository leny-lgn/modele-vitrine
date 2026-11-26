// @ts-check
import { defineConfig } from 'astro/config';
import redirections from './scripts/redirections.mjs';

// Adresse publique du déploiement, utilisée pour les URL absolues (canonique, Open Graph, JSON-LD, sitemap).
// À changer ici quand le nom de domaine sera branché ; la variable SITE_URL la remplace au besoin.
const site = process.env.SITE_URL || 'https://hautelice.fr';
if (!/^https:\/\//.test(site)) {
  throw new Error(`Adresse du site invalide : « ${site} ». Elle doit commencer par https://`);
}

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [redirections()],
  vite: {
    build: {
      // Seul <model-viewer> (Premium, objet 3D) dépasse 500 ko (≈ 1 Mo, three.js inclus).
      // Il est chargé à la demande (import dynamique, objet proche de l'écran, sur bureau),
      // jamais au chargement des pages : on relève la limite pour lui seul.
      chunkSizeWarningLimit: 1100,
    },
  },
});
