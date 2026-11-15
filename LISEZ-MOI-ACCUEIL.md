# Ajout : ton site à toi

1. Copie le contenu de ce dossier dans `~/Documents/sites/modele-vitrine/` :
   - `docs/briefs/accueil.md`
   - `src/data/moi.json`
   - `prompts/06-accueil.md`
2. Complète ce que tu peux dans `src/data/moi.json` (les `[À COMPLÉTER]`). Laisse
   `"publie": false` tant que tu n'as pas ton SIRET et tes prix définitifs.
3. `git add . && git commit -m "Brief et données de l'accueil" && git push`
4. Dans Claude Code : `/clear`, mode plan, puis colle `prompts/06-accueil.md`.
   Avance étape par étape (5 étapes), en validant chacune.
5. Quand tu as ton SIRET, tes prix et (idéalement) ton nom de domaine : complète
   `moi.json`, passe `"publie": true`, et pousse.
