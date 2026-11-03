# Prompt 0 — Fondations (une seule fois)

Mode plan (Shift+Tab) avant de coller. Valider le plan avant le code.

---

Lis `CLAUDE.md`, `docs/briefs/plombier.md` et les trois fichiers `src/sites/plombier-*.json`.
On construit d'abord les fondations communes à tous les sites, sans aucun design de secteur.

1. Configure Astro en statique et vérifie que `wrangler.jsonc` pointe sur `dist`.
2. Schéma zod de validation des fichiers `src/sites/*.json` (secteur, gamme, demo,
   images avec fichier/format/alt/prompt, pages…). Erreur claire si un champ manque.
3. Routage : une page par site et par page déclarée dans `pages`, mentions légales,
   confidentialité, 404, et la grille `/` de tous les modèles groupés par secteur.
4. `src/lib/typo-fr.ts` et son application à tous les textes issus du JSON.
5. Composants démo : `BandeauDemo`, `MenuModeles` (généré depuis src/sites), `CadreImage`
   (cadre en pointillés avec chemin, format et prompt complet + bouton Copier, lu depuis
   `docs/images/<secteur>-style.txt`), et le script `npm run images`.
6. Composants communs sans style de secteur : Appeler (barre mobile fixe), Horaires,
   Disponibilite (calcul « ouvert maintenant »), Carte statique, SEO (Open Graph, JSON-LD), PiedDePage.
7. `npm run build` puis montre-moi la grille `/` et un site vide avec ses cadres d'images.

Ne pousse rien sur Git.
