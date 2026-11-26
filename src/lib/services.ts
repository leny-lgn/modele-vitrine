// Lecture des prestations d'un groupe de services : libellé seul ou libellé + texte.
import type { Site } from './schema';

export type Prestation = Site['services'][number]['items'][number];

export function nomPrestation(p: Prestation): string {
  return typeof p === 'string' ? p : p.nom;
}

export function textePrestation(p: Prestation): string | undefined {
  return typeof p === 'string' ? undefined : p.texte;
}
