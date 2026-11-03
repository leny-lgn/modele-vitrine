#!/usr/bin/env node
// npm run images : liste toutes les images manquantes de tous les sites,
// avec le chemin où déposer le fichier, le format et le prompt complet.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  RACINE,
  cheminRelatif,
  imageExiste,
  lireFormat,
  promptComplet,
  FICHIER_CARTE,
  FORMAT_CARTE,
} from '../src/lib/images.mjs';

const dossier = join(RACINE, 'src/sites');
const fichiers = readdirSync(dossier).filter((f) => f.endsWith('.json') && !f.startsWith('_')).sort();

const gras = (t) => (process.stdout.isTTY ? `\x1b[1m${t}\x1b[0m` : t);
const discret = (t) => (process.stdout.isTTY ? `\x1b[2m${t}\x1b[0m` : t);

let manquantes = 0;
let total = 0;

for (const fichier of fichiers) {
  const site = JSON.parse(readFileSync(join(dossier, fichier), 'utf8'));
  const images = Object.entries(site.images ?? {});
  const absentes = images.filter(([, img]) => !imageExiste(site.slug, img.fichier));
  const carteAbsente = !imageExiste(site.slug, FICHIER_CARTE);
  total += images.length + 1;
  if (!absentes.length && !carteAbsente) continue;

  console.log(`\n${gras(`━━ ${site.slug}`)}  ${discret(`(${absentes.length + (carteAbsente ? 1 : 0)} manquante(s) sur ${images.length + 1})`)}`);

  for (const [cle, img] of absentes) {
    manquantes++;
    const f = lireFormat(img.format);
    console.log(`\n${gras(cheminRelatif(site.slug, img.fichier))}  ${discret(`images.${cle}`)}`);
    console.log(`Format ${img.format} · ${f.largeur} × ${f.hauteur} px${f.exact ? '' : ' conseillés'} · WebP`);
    console.log(`Alt : ${img.alt}`);
    console.log(discret('Prompt :'));
    console.log(promptComplet(site.secteur, img.prompt));
  }

  if (carteAbsente) {
    manquantes++;
    const f = lireFormat(FORMAT_CARTE);
    console.log(`\n${gras(cheminRelatif(site.slug, FICHIER_CARTE))}  ${discret('carte statique')}`);
    console.log(`Format ${FORMAT_CARTE} · ${f.largeur} × ${f.hauteur} px conseillés · WebP`);
    console.log(
      `Capture d'OpenStreetMap centrée sur ${site.adresse?.ville ?? '?'}` +
        (site.zone?.rayonKm ? `, environ ${site.zone.rayonKm} km autour` : '') +
        `, mention « © les contributeurs d'OpenStreetMap » visible.`,
    );
  }
}

console.log(
  manquantes
    ? `\n${gras(`${manquantes} image(s) manquante(s)`)} sur ${total}, ${fichiers.length} site(s).\n`
    : `\nToutes les images sont présentes (${total}, ${fichiers.length} site(s)).\n`,
);
