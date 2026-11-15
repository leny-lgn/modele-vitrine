// Seul endroit qui construit les URL internes.
// Les modèles de démonstration vivent sous /modeles/<slug>/ ; le site personnel est à la racine.
// Pour publier un site client à la racine de son domaine, il suffira de changer `racineSite`.
import type { Site, CleePage } from './schema';

export type CibleLien = CleePage | 'mentions-legales' | 'confidentialite';

/** Préfixe commun à tous les modèles de démonstration. */
export const PREFIXE_MODELES = '/modeles/';

export function racineSite(site: Pick<Site, 'slug'>): string {
  return `${PREFIXE_MODELES}${site.slug}/`;
}

export function lienSite(site: Pick<Site, 'slug'>, page: CibleLien = 'accueil'): string {
  return page === 'accueil' ? racineSite(site) : `${racineSite(site)}${page}/`;
}

/** Grille de tous les modèles. */
export const LIEN_GRILLE = PREFIXE_MODELES;

/** Accueil du site personnel. */
export const LIEN_ACCUEIL = '/';
