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
 * Texte échappé, avec chaque « [À VÉRIFIER] » surligné.
 * À utiliser avec set:html.
 */
export function marquerAVerifier(texte: string): string {
  return echapper(texte)
    .split(A_VERIFIER)
    .join(`<mark class="a-verifier">${A_VERIFIER}</mark>`);
}
