// Données du site personnel (src/data/moi.json).
// Lecture minimale pour l'instant ; le schéma de validation complet arrive avec les pages.
import brut from '../data/moi.json';
import { typoFr } from './typo-fr';

/** Nom affiché (ex. dans le menu « Modèles » des démos). */
export const NOM = typoFr(brut.nom);

/** Le site est-il publié ? Tant que non : noindex partout. */
export const PUBLIE = brut.publie === true;
