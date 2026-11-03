import { JOURS, type Jour, type Site } from './schema';
import { plageFr } from './typo-fr';

export const LIBELLES_JOURS: Record<Jour, string> = {
  lundi: 'Lundi',
  mardi: 'Mardi',
  mercredi: 'Mercredi',
  jeudi: 'Jeudi',
  vendredi: 'Vendredi',
  samedi: 'Samedi',
  dimanche: 'Dimanche',
};

export function plagesDuJour(horaires: Site['horaires'], jour: Jour): string {
  const plages = horaires[jour];
  return plages.length ? plages.map((p) => plageFr(p)).join(', ') : 'Fermé';
}

/**
 * Regroupe les jours consécutifs aux horaires identiques :
 * « Lundi au jeudi : 8 h – 12 h, 13 h 30 – 18 h 30 ».
 * Les jours fermés en fin de semaine sont omis (le tableau complet les montre).
 */
export function resumeHoraires(horaires: Site['horaires']): { jours: string; plages: string }[] {
  const groupes: { debut: Jour; fin: Jour; plages: string }[] = [];
  for (const jour of JOURS) {
    const plages = plagesDuJour(horaires, jour);
    const dernier = groupes.at(-1);
    if (dernier && dernier.plages === plages) dernier.fin = jour;
    else groupes.push({ debut: jour, fin: jour, plages });
  }
  return groupes
    .filter((g) => g.plages !== 'Fermé')
    .map((g) => {
      const debut = LIBELLES_JOURS[g.debut];
      const fin = LIBELLES_JOURS[g.fin].toLowerCase();
      const jours =
        g.debut === g.fin
          ? debut
          : JOURS.indexOf(g.fin) - JOURS.indexOf(g.debut) === 1
            ? `${debut} et ${fin}`
            : `${debut} au ${fin}`;
      return { jours, plages: g.plages };
    });
}

/** Spécification schema.org des horaires d'ouverture. */
export function horairesJsonLd(horaires: Site['horaires']) {
  const jourEn: Record<Jour, string> = {
    lundi: 'Monday',
    mardi: 'Tuesday',
    mercredi: 'Wednesday',
    jeudi: 'Thursday',
    vendredi: 'Friday',
    samedi: 'Saturday',
    dimanche: 'Sunday',
  };
  return JOURS.flatMap((j) =>
    horaires[j].map(([opens, closes]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: jourEn[j],
      opens,
      closes,
    })),
  );
}
