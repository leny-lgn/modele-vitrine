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

/** Pages du site personnel. */
export const LIEN_TARIFS = '/tarifs/';
/** Fiche contact (vCard) à enregistrer dans le téléphone, générée depuis moi.json. */
export const LIEN_VCARD = '/contact.vcf';
export const LIEN_CONTACT = '/contact/';
export const LIEN_MENTIONS = '/mentions-legales/';
export const LIEN_CONFIDENTIALITE = '/confidentialite/';

/** Pages du site personnel, seules pages indexables (sitemap). Les démos n'y figurent jamais. */
export const PAGES_PERSO = [
  LIEN_ACCUEIL,
  LIEN_GRILLE,
  LIEN_TARIFS,
  LIEN_CONTACT,
  LIEN_MENTIONS,
  LIEN_CONFIDENTIALITE,
] as const;

/** Image de partage (Open Graph) de l'accueil, générée par `npm run captures`. */
export const IMAGE_PARTAGE_PERSO = '/images/accueil/partage.jpg';
