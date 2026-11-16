---
target: site personnel
total_score: 28
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 2
target_identity: "file:/Users/lenylangon/web/sites/modele-vitrine/src/pages/index.astro"
target_fingerprint: "sha256:6b2cdd830fc2eed6bd30411f221f421f08bce74f5f092af6eacb5c88be15a91d"
target_path: /Users/lenylangon/web/sites/modele-vitrine/src/pages/index.astro
timestamp: 2026-11-15T20-13-32Z
slug: src-pages-index-astro
---
# Critique — site personnel (accueil, tarifs, modèles, contact)
Method: dual-agent (A design review · B detector + browser)

Heuristiques : 1:3 2:4 3:3 4:3 5:2 6:4 7:n/a 8:3 9:3 10:3 — total 28/36 (Bon).

Spécificité : écrit pour le produit (rubriques vertes, points de conduite, trois épaisseurs d'annonce). La section Tarifs de l'accueil retombe sur un tableau de prix à trois colonnes générique.

Détecteur : sources propres ; HTML construit : contraste au survol du lien d'évitement (corrigé), 2 cramped-padding (faux positifs, filets ouverts voulus), hiérarchie plate h4 16 px < texte 17 px (étiquettes de gamme).

Priorités :
- [P1] Numéros fictifs « 02 00 00 00 00 » composés comme le vrai numéro dans les annonces : confusion, risque de noter le mauvais numéro. Rubrique.astro .an-tel.
- [P1] Section Tarifs de l'accueil : quitte la métaphore d'annuaire et répète les prix de la rubrique. Offres.astro.
- [P2] Étudiant / je viens sur place / le site est à vous : n'apparaît qu'à ~4 000 px sur mobile. index.astro .ap-qui + champ moi.json.
- [P2] Triple numéro dans le premier écran mobile (grand numéro, bouton, barre fixe) ; villes deux fois dans le héros.
- [P3] Annonce Essentiel orpheline à 1280 px.

Corrigé pendant le contrôle : liens 42→44 px, h1 lu « internetLannion », débordement des boutons et annonces serrées à 768 px, offres trop serrées à 768 px, dl invalides (span entre dt et dd), lien d'évitement au survol, « Ville-/Exemple », « Voir/Ouvrir » harmonisés, « sur mesure ».
