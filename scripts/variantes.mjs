#!/usr/bin/env node
// Génère les versions 400 / 800 / 1600 px de chaque image WebP déposée dans public/images/<slug>/
// vers public/images/<slug>/_variantes/ (dossier ignoré par Git, recréé à chaque build).
// Ne régénère une variante que si l'original est plus récent.
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { RACINE, LARGEURS, DOSSIER_VARIANTES, nomVariante } from '../src/lib/images.mjs';

const racineImages = join(RACINE, 'public/images');
let creees = 0;

if (existsSync(racineImages)) {
  for (const slug of readdirSync(racineImages)) {
    const dossier = join(racineImages, slug);
    if (!statSync(dossier).isDirectory()) continue;

    for (const fichier of readdirSync(dossier).filter((f) => f.endsWith('.webp'))) {
      const source = join(dossier, fichier);
      const { width } = await sharp(source).metadata();
      for (const largeur of LARGEURS.filter((l) => width && l < width)) {
        const cible = join(dossier, nomVariante(fichier, largeur));
        if (existsSync(cible) && statSync(cible).mtimeMs >= statSync(source).mtimeMs) continue;
        mkdirSync(join(dossier, DOSSIER_VARIANTES), { recursive: true });
        await sharp(source).resize({ width: largeur }).webp({ quality: 78 }).toFile(cible);
        creees++;
      }
    }
  }
}

if (creees) console.log(`Variantes d'images : ${creees} fichier(s) créé(s).`);
