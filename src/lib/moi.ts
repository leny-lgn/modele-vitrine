// Données du site personnel (src/data/moi.json) : validation, typographie, valeurs dérivées.
// Toute erreur ici fait échouer la construction, avec un message lisible.
import { z } from 'astro/zod';
import brut from '../data/moi.json';
import { GAMMES, type Gamme } from './schema';
import { typoFr } from './typo-fr';

/** Marqueur des informations que l'auteur doit encore fournir (variantes : « [À COMPLÉTER : ville] »…). */
export const A_COMPLETER = '[À COMPLÉTER]';
const MOTIF_A_COMPLETER = /\[À COMPLÉTER[^\]]*\]/;
/** Avant publication, refuser aussi tout texte d'exemple ou entre crochets (« [ville] », « Exemple de ton : … »). */
const MOTIF_NON_PUBLIABLE = /\[[^\]]*\]|^Exemple de ton/;

const texte = z.string().min(1, 'texte vide');
/** Prix : nombre d'euros, ou texte tant qu'il n'est pas fixé. */
const prix = z.union([z.number().nonnegative(), texte]);

const moiSchema = z.object({
  publie: z.boolean(),
  nom: texte,
  nomCommercial: z.string(),
  /** Fichiers du logo dans public/images/marque/ : version claire (fonds sombres),
      sombre (fonds clairs) et icône d'onglet. Facultatif : sans logo, le nom s'affiche en texte. */
  logo: z.object({ clair: texte, sombre: texte, favicon: texte }).optional(),
  accroche: texte,
  /** Une phrase sous l'accroche de l'accueil : qui vous êtes, en fait (statut, déplacement, propriété du site). */
  enBref: texte,
  telephone: texte,
  email: texte,
  /** Métiers proposés dans « Votre métier ? » sur l'accueil, en plus de ceux qui ont déjà un modèle. */
  metiers: z.array(texte),
  villes: z.array(texte).min(1, 'au moins une ville'),
  zone: texte,
  disponibilites: texte,
  presentation: z.array(texte).min(1),
  /** Fichier dans public/images/accueil/ (vide : pas de photo). */
  photo: z.string(),
  mentionsLegales: z.object({
    statut: texte,
    adresse: texte,
    siret: texte,
    tva: texte,
    hebergeur: texte,
    /** Durée de conservation des messages et coordonnées reçus. */
    conservation: texte,
  }),
  gammes: z
    .array(
      z.object({
        id: z.enum(GAMMES),
        nom: texte,
        pourQui: texte,
        prix,
        pages: texte,
        delai: texte,
        inclus: z.array(texte).min(1),
      }),
    )
    .length(3, 'trois gammes attendues'),
  /** Précision affichée sous les gammes (point de départ des délais). */
  noteDelais: texte,
  abonnement: z.object({ prix, inclus: z.array(texte).min(1), conditions: texte }),
  options: z.array(z.object({ nom: texte, prix })),
  /** Services hors création de site (refonte, reprise, pack visibilité). */
  autresServices: z.array(z.object({ nom: texte, pourQui: texte, prix })),
  /** Conditions et facilités de paiement, une phrase par ligne. */
  paiement: z.array(texte),
  etapes: z.array(z.object({ titre: texte, texte })).min(1),
  faq: z.array(z.object({ q: texte, r: texte })),
  /** Vrais clients uniquement, avec leur accord. Section masquée si vide. */
  realisations: z.array(
    z.object({
      nom: texte,
      metier: texte,
      ville: texte,
      url: z.url('adresse complète attendue (https://…)'),
      /** Fichier dans public/images/accueil/ (facultatif). */
      capture: z.string().optional(),
    }),
  ),
});

export type Moi = z.infer<typeof moiSchema>;
export type GammeMoi = Moi['gammes'][number];

// Clés dont la valeur est technique : jamais transformée par typoFr.
const CLES_TECHNIQUES = new Set(['telephone', 'email', 'photo', 'id', 'url', 'capture', 'siret', 'logo']);

function appliquerTypo<T>(valeur: T, cle?: string): T {
  if (cle && CLES_TECHNIQUES.has(cle)) return valeur;
  if (typeof valeur === 'string') return typoFr(valeur) as T;
  if (Array.isArray(valeur)) return valeur.map((v) => appliquerTypo(v)) as T;
  if (valeur && typeof valeur === 'object') {
    return Object.fromEntries(Object.entries(valeur).map(([k, v]) => [k, appliquerTypo(v, k)])) as T;
  }
  return valeur;
}

function cheminsACompleter(valeur: unknown, chemin: string[] = []): string[] {
  if (typeof valeur === 'string') return MOTIF_NON_PUBLIABLE.test(valeur) ? [chemin.join('.')] : [];
  if (Array.isArray(valeur)) return valeur.flatMap((v, i) => cheminsACompleter(v, [...chemin, String(i)]));
  if (valeur && typeof valeur === 'object') {
    return Object.entries(valeur).flatMap(([k, v]) => cheminsACompleter(v, [...chemin, k]));
  }
  return [];
}

function charger(): Moi {
  const resultat = moiSchema.safeParse(brut, {
    error: (iss) => (iss.input === undefined ? 'champ manquant' : undefined),
  });
  if (!resultat.success) {
    const lignes = resultat.error.issues.map((i) => `  - ${i.path.join('.') || '(racine)'} : ${i.message}`);
    throw new Error(`\n\nFichier invalide : src/data/moi.json\n${lignes.join('\n')}\n`);
  }
  const moi = resultat.data;
  const erreurs: string[] = [];

  const ids = moi.gammes.map((g) => g.id);
  if (new Set(ids).size !== ids.length) erreurs.push('gammes : chaque id (essentiel, vitrine, premium) une seule fois');

  if (moi.publie) {
    const restants = cheminsACompleter(brut);
    if (restants.length) {
      erreurs.push(
        `publie: true mais il reste ${restants.length} texte(s) à compléter ou d'exemple :\n${restants.map((c) => `      · ${c}`).join('\n')}`,
      );
    }
  }

  if (erreurs.length) {
    throw new Error(`\n\nFichier invalide : src/data/moi.json\n${erreurs.map((e) => `  - ${e}`).join('\n')}\n`);
  }
  return appliquerTypo(moi);
}

export const MOI: Moi = charger();

/** Le texte contient-il encore une information à fournir ? */
export function aCompleter(valeur: unknown): boolean {
  return typeof valeur === 'string' && MOTIF_A_COMPLETER.test(valeur);
}

/** Nom affiché : nom commercial s'il est renseigné, sinon prénom et nom. */
export const NOM = MOI.nomCommercial.trim() && !aCompleter(MOI.nomCommercial) ? MOI.nomCommercial : MOI.nom;

/** Le site est-il publié ? Tant que non : noindex partout et bandeau « Site en préparation ». */
export const PUBLIE = MOI.publie;

const NBSP = ' ';
const FINE = ' ';

/** 1200 → « 1 200 € » (espace fine insécable pour les milliers, insécable avant €). */
export function prixFr(valeur: number | string): string {
  if (typeof valeur === 'string') return valeur;
  const entier = Math.round(valeur)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, FINE);
  return `${entier}${NBSP}€`;
}

export function gamme(id: Gamme): GammeMoi {
  return MOI.gammes.find((g) => g.id === id)!;
}

/** Prix d'entrée (gamme la moins chère), ou le texte à compléter tant qu'un prix manque. */
export function prixPlancher(): string {
  const nombres = MOI.gammes.map((g) => g.prix).filter((p): p is number => typeof p === 'number');
  if (nombres.length !== MOI.gammes.length) return A_COMPLETER;
  return prixFr(Math.min(...nombres));
}

/** Villes en une ligne : « Lannion, Brest et Nantes ». */
export function villesFr(): string {
  const v = MOI.villes;
  return v.length > 1 ? `${v.slice(0, -1).join(', ')} et ${v.at(-1)}` : v[0];
}

const ECHAPPEMENTS: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Texte échappé, chaque « [À COMPLÉTER…] » surligné. À utiliser avec set:html. */
export function marquer(texte: string): string {
  return texte
    .replace(/[&<>"']/g, (c) => ECHAPPEMENTS[c])
    .replace(new RegExp(MOTIF_A_COMPLETER.source, 'g'), (m) => `<mark class="a-completer">${m}</mark>`);
}

/** URL d'un fichier du logo (public/images/marque/), ou undefined sans logo. */
export function urlLogo(variante: 'clair' | 'sombre' | 'favicon'): string | undefined {
  const f = MOI.logo?.[variante];
  return f ? `/images/marque/${f}` : undefined;
}
