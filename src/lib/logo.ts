// Logo du site perso intégré au HTML (et non en <img>) : sa couleur suit `color` en CSS.
// Le dessin reste celui du fichier public/images/marque/<logo.clair> ; seuls les aplats blancs
// deviennent « currentColor ». Les identifiants internes (masque, dégradé, découpe) reçoivent
// un suffixe, pour que plusieurs copies dans la même page restent valides.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RACINE } from './images.mjs';
import { urlLogo } from './moi';

export function logoEnLigne(classe: string, suffixe: string): string | undefined {
  const fichier = urlLogo('clair');
  if (!fichier) return undefined;
  let svg = readFileSync(join(RACINE, 'public', fichier), 'utf8');

  const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of ids) {
    svg = svg.replaceAll(`id="${id}"`, `id="${id}-${suffixe}"`).replaceAll(`url(#${id})`, `url(#${id}-${suffixe})`);
  }

  return svg
    .replace(/<svg ([^>]*)>/, (_, attrs: string) => {
      const viewBox = attrs.match(/viewBox="[^"]+"/)?.[0] ?? '';
      return `<svg xmlns="http://www.w3.org/2000/svg" ${viewBox} class="${classe}" aria-hidden="true" focusable="false">`;
    })
    .replace(/fill="#FFFFFF"/gi, 'fill="currentColor"');
}
