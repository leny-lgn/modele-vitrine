import { A_VERIFIER, EXEMPLE } from './sites';

const ECHAPPEMENTS: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function echapper(texte: string): string {
  return texte.replace(/[&<>"']/g, (c) => ECHAPPEMENTS[c]);
}

export function contientAVerifier(texte: string | undefined | null): boolean {
  return !!texte && texte.includes(A_VERIFIER);
}

/** Valeur d'exemple de la démo (« [EXEMPLE] 40 € ») : prix, délai, assurance… */
export function contientExemple(texte: string | undefined | null): boolean {
  return !!texte && texte.includes(EXEMPLE);
}

const MOTIF_EXEMPLE = /\[EXEMPLE\][\s\u00a0\u202f]*/g;

/** Texte sans le marqueur « [EXEMPLE] » (non échappé). */
export function sansMarqueurExemple(texte: string): string {
  return texte.replace(MOTIF_EXEMPLE, '');
}

/**
 * Texte échappé, chaque « [À VÉRIFIER] » remplacé par une étiquette en pointillés.
 * L'étiquette reprend le texte qui suit le marqueur, jusqu'à la première ponctuation
 * (« [À VÉRIFIER] votre délai d'intervention » → ┆votre délai d'intervention┆) ;
 * un marqueur seul affiche `libelle` (« à compléter » par défaut, « votre tarif » dans un tableau de prix).
 * « [EXEMPLE] » (valeur d'exemple de la démo) est retiré et la valeur suivie de « (exemple) ».
 * Le marqueur n'apparaît qu'en démo : avec demo: false, la construction échoue s'il en reste.
 * À utiliser avec set:html.
 */
export function marquerAVerifier(
  texte: string,
  libelle = 'à compléter',
  /** « note » : « (exemple) » après une valeur d'exemple ; « aucune » quand la section le dit déjà une fois. */
  exemple: 'note' | 'aucune' = 'note',
): string {
  const estExemple = contientExemple(texte);
  const [debut, ...suites] = echapper(sansMarqueurExemple(texte)).split(A_VERIFIER);
  const note = estExemple && exemple === 'note' ? ' <span class="note-exemple">(exemple)</span>' : '';
  return (
    debut +
    suites
      .map((suite) => {
        const m = suite.match(/^[\s\u00a0\u202f]+([^.:;(]+?)(?=[\s\u00a0\u202f]*(?:[.:;(]|$))/);
        const contenu = m ? m[1].trim() : libelle;
        const reste = m ? suite.slice(m[0].length) : suite;
        return `<span class="a-completer">${contenu}</span>${reste}`;
      })
      .join('') +
    note
  );
}
