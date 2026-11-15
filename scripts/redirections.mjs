// Intégration Astro : écrit dist/_redirects à la fin de la construction.
// Les modèles ont quitté la racine (/plombier-premium/) pour /modeles/plombier-premium/ :
// une redirection permanente (301) par site, générée depuis src/sites/ (aucune adresse écrite à la main).
// Cloudflare Workers (static assets) lit ce fichier et ne le sert pas aux visiteurs.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const DOSSIER_SITES = fileURLToPath(new URL('../src/sites/', import.meta.url));

export default function redirections() {
  return {
    name: 'redirections-anciennes-adresses',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const slugs = readdirSync(DOSSIER_SITES)
          .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
          .map((f) => JSON.parse(readFileSync(DOSSIER_SITES + f, 'utf8')).slug)
          .sort();
        const lignes = slugs.flatMap((slug) => [
          `/${slug} /modeles/${slug}/ 301`,
          `/${slug}/ /modeles/${slug}/ 301`,
          `/${slug}/* /modeles/${slug}/:splat 301`,
        ]);
        writeFileSync(
          new URL('_redirects', dir),
          `# Généré par scripts/redirections.mjs : ne pas modifier à la main.\n${lignes.join('\n')}\n`,
        );
        logger.info(`_redirects : ${slugs.length} site(s) redirigé(s) vers /modeles/.`);
      },
    },
  };
}
