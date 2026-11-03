// Petites fonctions de lecture du JSON propres à la gamme Premium.
import type { Site, CleePage } from './schema';
import { racineSite } from './liens';

export type Chantier = Site['realisations'][number];
type Artisan = { prenom?: string; nom?: string; depuis?: number; presentation?: string };
type Confiance = { qualifications?: string[]; assuranceDecennale?: string };

/** Page d'un chantier : <site>/realisations/<slug>/ */
export function lienChantier(site: Pick<Site, 'slug'>, slug: string): string {
  return `${racineSite(site)}realisations/${slug}/`;
}

/** Groupe de services rattaché à une page (dépannage, installation, rénovation). */
export function groupeDePage(site: Site, page: CleePage) {
  return site.services.find((g) => g.page === page);
}

/** Les deux photos avant/après existent dans `images`. */
export function aAvantApres(site: Site, r: Chantier): boolean {
  return !!(r.avant && r.apres && site.images[r.avant] && site.images[r.apres]);
}

/** Premier chantier présentable en avant/après. */
export function chantierVedette(site: Site, groupe?: string): Chantier | undefined {
  return site.realisations.find((r) => aAvantApres(site, r) && (!groupe || r.groupe === groupe));
}

export function infosArtisan(site: Site) {
  const artisan = (site.artisan ?? {}) as Artisan;
  const confiance = (site.confiance ?? {}) as Confiance;
  return {
    artisan,
    nomArtisan: [artisan.prenom, artisan.nom].filter(Boolean).join(' '),
    qualifications: confiance.qualifications?.filter(Boolean) ?? [],
    assurance: confiance.assuranceDecennale,
  };
}
