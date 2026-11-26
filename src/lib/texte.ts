import { A_VERIFIER } from './sites';

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

/**
 * Texte échappé, chaque « [À VÉRIFIER] » remplacé par une étiquette en pointillés.
 * L'étiquette reprend le texte qui suit le marqueur, jusqu'à la première ponctuation
 * (« [À VÉRIFIER] votre délai d'intervention » → ┆votre délai d'intervention┆) ;
 * un marqueur seul affiche `libelle` (« à compléter » par défaut, « votre tarif » dans un tableau de prix).
 * Le marqueur n'apparaît qu'en démo : avec demo: false, la construction échoue s'il en reste.
 * À utiliser avec set:html.
 */
export function marquerAVerifier(texte: string, libelle = 'à compléter'): string {
  const [debut, ...suites] = echapper(texte).split(A_VERIFIER);
  return (
    debut +
    suites
      .map((suite) => {
        const m = suite.match(/^[\s\u00a0\u202f]+([^.:;(]+?)(?=[\s\u00a0\u202f]*(?:[.:;(]|$))/);
        const contenu = m ? m[1].trim() : libelle;
        const reste = m ? suite.slice(m[0].length) : suite;
        return `<span class="a-completer">${contenu}</span>${reste}`;
      })
      .join('')
  );
}
