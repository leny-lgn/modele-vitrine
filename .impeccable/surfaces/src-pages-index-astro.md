---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Surface : site personnel (accueil, /modeles/, /tarifs/, /contact/, pages légales)

Mode : Persuade. Public : commerçants et artisans de Lannion, Brest, Nantes ; le curieux
sur mobile (modèle de son métier + prix, puis rappeler), le décidé sur ordinateur
(comparer les gammes, vérifier le sérieux). Action : appeler. Preuve : les modèles de
démonstration (entreprises fictives assumées). Aucun client, aucun avis, aucun chiffre.
Brief complet : docs/briefs/accueil.md. Données : src/data/moi.json.

## Direction contract

THESIS : le site est une page d'annuaire professionnel. Les secteurs sont des rubriques,
les trois gammes sont les trois tailles d'annonce (ligne, encadré, pleine annonce avec
capture). Refuse le gabarit « héros + 3 cartes de prix + témoignages ».

OWN-WORLD : blanc #FCFCFA, encre #111, filets noirs fins, colonnes d'annuaire. Accent
unique vert sapin #1E5E3B (rubriques, bouton Appeler). Libre Franklin (titres lourds,
rubriques en capitales de rubrique, texte) ; Overpass Mono réservé aux numéros et prix.
Annonces encadrées au trait, sans ombre ni arrondi. Pas de jaune, pas de pastiche rétro
(pas de papier jauni, pas de vieilles réclames).

STORY : il reconnaît un annuaire, trouve sa rubrique, voit en un coup d'œil ce que change
chaque gamme par la taille de l'annonce, lit le prix, appelle.

FIRST VIEWPORT : en tête, rubrique « Sites internet · Lannion, Brest, Nantes » ; dessous,
ta propre annonce encadrée pleine largeur : nom, phrase d'accroche, téléphone en grand
(Overpass Mono), « Dès … € », bouton « Appeler le … ». À 375 px tout tient avant le pli ;
barre Appeler fixe en bas. Au bureau, navigation en colonne à droite de l'annonce, la
rubrique Plombier commence sous le pli.

FORM : annuaire professionnel par métier, candidat n°1 de la liste (carte IMPECCABLE’S
PICK, choisie par l'utilisateur). seed:00af484ce40fce86

FINISH : unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
