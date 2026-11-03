// Typographie française appliquée à tous les textes issus des fichiers de site.
// Idempotente : appliquer deux fois donne le même résultat.

const NBSP = ' '; // espace insécable
const FINE = ' '; // espace fine insécable

/** Applique les règles de typographie française à un texte. */
export function typoFr(texte: string): string {
  if (!texte) return texte;
  let t = texte;

  // Points de suspension
  t = t.replace(/\.{3}/g, '…');

  // Apostrophe typographique
  t = t.replace(/'/g, '’');

  // Guillemets droits par paires → « »
  t = t.replace(/"([^"]*)"/g, `«${NBSP}$1${NBSP}»`);
  // Insécables à l'intérieur des guillemets français
  t = t.replace(/«[\s  ]*/g, `«${NBSP}`).replace(/[\s  ]*»/g, `${NBSP}»`);

  // Espace fine avant ; ! ? (uniquement en fin de mot : épargne les URL « ?a=1 »)
  t = t.replace(/[   ]*([;!?])(?=[\s»)\]’]|$)/g, (_m, signe, offset: number) =>
    offset === 0 ? signe : `${FINE}${signe}`,
  );
  // Insécable avant : (épargne 08:00 et https://)
  t = t.replace(/[   ]*:(?=[\s»)\]]|$)/g, (_m, offset: number) =>
    offset === 0 ? ':' : `${NBSP}:`,
  );

  // Nombre + unité : 15 km, 20 €, 6 jours, 8 h 30
  t = t.replace(
    /(\d)[  ](km|m²|m|cm|mm|€|%|h|min|ans?|jours?|mois|semaines?|L|l|°C)(?=[\s.,;:!?)»]|$)/g,
    `$1${NBSP}$2`,
  );
  t = t.replace(/(\d h) (\d{2})\b/g, `$1${NBSP}$2`);

  // Tiret d'intervalle entouré d'espaces : insécable avant
  t = t.replace(/ ([–—]) /g, `${NBSP}$1 `);

  return t;
}

/** « 08:00 » → « 8 h », « 13:30 » → « 13 h 30 » (avec insécables). */
export function heureFr(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  return m ? `${h}${NBSP}h${NBSP}${String(m).padStart(2, '0')}` : `${h}${NBSP}h`;
}

/** Plage horaire « 8 h – 12 h ». */
export function plageFr([debut, fin]: readonly [string, string] | string[]): string {
  return `${heureFr(debut)}${NBSP}–${NBSP}${heureFr(fin)}`;
}

function chiffres(tel: string): string {
  return tel.replace(/[^\d+]/g, '');
}

/** « 0200000000 » → « 02 00 00 00 00 » avec espaces insécables. */
export function telephoneFr(tel: string): string {
  let c = chiffres(tel);
  if (c.startsWith('+33')) c = '0' + c.slice(3);
  if (/^\d{10}$/.test(c)) return c.match(/\d{2}/g)!.join(NBSP);
  return tel.replace(/ /g, NBSP);
}

/** Lien tel: au format international (+33…). */
export function telHref(tel: string): string {
  const c = chiffres(tel);
  if (/^0\d{9}$/.test(c)) return `tel:+33${c.slice(1)}`;
  return `tel:${c}`;
}

/** Numéro au format E.164 pour le JSON-LD. */
export function telInternational(tel: string): string {
  return telHref(tel).slice(4);
}
