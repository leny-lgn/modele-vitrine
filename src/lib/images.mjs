// Fonctions images partagées entre les composants Astro et les scripts npm
// (fichier .mjs pour être lisible directement par Node, sans compilation).
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const RACINE = process.cwd();
export const LARGEURS = [400, 800, 1600];
export const DOSSIER_VARIANTES = '_variantes';

/** Chemin public d'une image : /images/<slug>/<fichier> */
export function urlImage(slug, fichier) {
  return `/images/${slug}/${fichier}`;
}

/** Chemin sur le disque, relatif au projet : public/images/<slug>/<fichier> */
export function cheminRelatif(slug, fichier) {
  return `public/images/${slug}/${fichier}`;
}

export function imageExiste(slug, fichier) {
  return existsSync(join(RACINE, cheminRelatif(slug, fichier)));
}

/**
 * « 16:9 » → { ratio: 16/9, largeur: 1600, hauteur: 900 }
 * « 1200x630 » → dimensions exactes.
 */
export function lireFormat(format) {
  const px = /^(\d+)x(\d+)$/.exec(format);
  if (px) {
    const largeur = Number(px[1]);
    const hauteur = Number(px[2]);
    return { ratio: largeur / hauteur, largeur, hauteur, exact: true };
  }
  const r = /^(\d+):(\d+)$/.exec(format);
  if (!r) throw new Error(`Format d'image invalide : ${format}`);
  const ratio = Number(r[1]) / Number(r[2]);
  const largeur = 1600;
  return { ratio, largeur, hauteur: Math.round(largeur / ratio), exact: false, css: `${r[1]} / ${r[2]}` };
}

const styles = new Map();

/** Bloc de style du secteur : docs/images/<secteur>-style.txt (vide s'il n'existe pas). */
export function blocStyle(secteur) {
  if (!styles.has(secteur)) {
    const chemin = join(RACINE, 'docs/images', `${secteur}-style.txt`);
    styles.set(secteur, existsSync(chemin) ? readFileSync(chemin, 'utf8').trim() : '');
  }
  return styles.get(secteur);
}

/** Prompt complet = bloc de style du secteur + prompt propre à l'image. */
export function promptComplet(secteur, prompt) {
  return [blocStyle(secteur), prompt.trim()].filter(Boolean).join('\n\n');
}

/** Nom de la variante d'une image pour une largeur donnée. */
export function nomVariante(fichier, largeur) {
  return `${DOSSIER_VARIANTES}/${fichier.replace(/\.webp$/, '')}-${largeur}.webp`;
}

/** Carte statique : un fichier par site, au nom fixe. */
export const FICHIER_CARTE = 'carte.webp';
export const FORMAT_CARTE = '3:2';
