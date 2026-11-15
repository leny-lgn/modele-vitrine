# Prompt 6 — Ton site à toi (accueil + modèles)

Prérequis : `docs/briefs/accueil.md` et `src/data/moi.json` copiés dans le dépôt.
Mode plan (Shift+Tab) avant de coller.

---

Lis `CLAUDE.md`, `docs/briefs/accueil.md` et `src/data/moi.json`. On construit mon site
à moi : l'accueil qui me présente, mes offres et tarifs, et l'accès à tous les modèles.
Ce n'est pas un modèle de démo : il a son propre style, nettement différent des secteurs.

**Étape 1 — Direction artistique.** Avec Impeccable, propose 3 directions différentes
(dont « le nuancier » du brief), chacune avec : idée en une phrase, palette avec une
seule couleur d'accent, duo de polices hors liste interdite et différent des thèmes de
secteurs, élément signature, wireframe ASCII mobile et bureau de l'accueil. Critique
chacune (qu'est-ce qui fait « agence » ou « généré par IA » ?), puis attends mon choix.

**Étape 2 — Réorganisation des adresses.** Propose-moi le plan avant de le faire :
- accueil à `/`, grille complète à `/modeles/`, démos déplacées sous `/modeles/<slug>/` ;
- redirections permanentes depuis les anciennes adresses (fichier `_redirects` si
  Cloudflare Workers static assets le gère, sinon la meilleure alternative) ;
- mise à jour du MenuModeles (lien « Retour au site de [nom] »), des CadreImage, des
  chemins d'images et des URL canoniques ;
- `site` correctement renseigné dans astro.config.mjs (plus aucune URL en localhost).
Attends mon accord, applique, puis vérifie que toutes les démos marchent encore.

**Étape 3 — Construction.** Schéma zod pour `moi.json`. Pages : `/`, `/modeles/`,
`/tarifs/`, `/contact/`, `/mentions-legales/`, `/confidentialite/`, structurées selon le
brief. Le nuancier (ou l'équivalent dans la direction choisie) est généré
automatiquement depuis `src/sites/` : chaque nouveau secteur y apparaît seul.
Captures des modèles : génère-les avec Playwright dans `public/images/accueil/` (script
`npm run captures`) plutôt que de les dessiner.

**Étape 4 — Indexation.** Pages perso indexables, sitemap limité à ces pages, Open Graph
avec une image de partage pour l'accueil, JSON-LD `ProfessionalService` (ou plus précis
si adapté), démos toujours en `noindex`, robots.txt qui ne bloque pas les démos.
Tant que `publie` est false : `noindex` partout + bandeau « Site en préparation ».
Construction en échec si `publie` est true et qu'il reste un `[À COMPLÉTER]`.

**Étape 5 — Contrôle.** Skill `controle-qualite` + `/impeccable critique` sur l'accueil,
les tarifs et `/modeles/`. Test des 5 secondes à 375 px : on comprend qui je suis, ce que
je fais, combien ça coûte et comment m'appeler. Puis liste de ce que je dois compléter
dans `moi.json`, et les commandes Git. Ne pousse rien.
