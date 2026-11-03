// Données génériques par secteur et par page (aucun contenu propre à un commerce).
import type { CleePage, Gamme } from './schema';

interface InfosSecteur {
  libelle: string;
  /** Type schema.org pour le JSON-LD */
  typeJsonLd: string;
}

const SECTEURS: Record<string, InfosSecteur> = {
  plombier: { libelle: 'Plombier', typeJsonLd: 'Plumber' },
};

export function infosSecteur(secteur: string): InfosSecteur {
  return (
    SECTEURS[secteur] ?? {
      libelle: secteur.charAt(0).toUpperCase() + secteur.slice(1),
      typeJsonLd: 'LocalBusiness',
    }
  );
}

export const LIBELLES_GAMMES: Record<Gamme, string> = {
  essentiel: 'Essentiel',
  vitrine: 'Vitrine',
  premium: 'Premium',
};

export const LIBELLES_PAGES: Record<CleePage, string> = {
  accueil: 'Accueil',
  services: 'Services',
  tarifs: 'Tarifs',
  realisations: 'Réalisations',
  contact: 'Contact',
  depannage: 'Dépannage',
  installation: 'Installation',
  renovation: 'Rénovation',
  artisan: 'L’artisan',
  devis: 'Devis',
};
