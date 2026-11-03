// @ts-check
import { defineConfig } from 'astro/config';

// Adresse publique du déploiement, utilisée pour les URL absolues (Open Graph, JSON-LD).
// À définir dans Cloudflare (variable de build SITE_URL), par ex. https://modele-vitrine.<compte>.workers.dev
const site = process.env.SITE_URL || 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: {
    build: {
      // Seul <model-viewer> (Premium, objet 3D) dépasse 500 ko (≈ 1 Mo, three.js inclus).
      // Il est chargé à la demande (import dynamique, objet proche de l'écran, sur bureau),
      // jamais au chargement des pages : on relève la limite pour lui seul.
      chunkSizeWarningLimit: 1100,
    },
  },
});
