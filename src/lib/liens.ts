// Seul endroit qui construit les URL internes d'un site.
// Pour publier un site client à la racine de son domaine, il suffira de changer `racineSite`.
import type { Site, CleePage } from './schema';

export type CibleLien = CleePage | 'mentions-legales' | 'confidentialite';

export function racineSite(site: Pick<Site, 'slug'>): string {
  return `/${site.slug}/`;
}

export function lienSite(site: Pick<Site, 'slug'>, page: CibleLien = 'accueil'): string {
  return page === 'accueil' ? racineSite(site) : `${racineSite(site)}${page}/`;
}

export const LIEN_GRILLE = '/';
