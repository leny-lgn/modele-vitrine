---
name: controle-qualite
description: Contrôle une page de démo ou de site client avant de la montrer : rendu mobile et bureau, look « généré par IA », textes, typographie française, accessibilité, performance, mentions légales. À utiliser après toute création ou modification d'un site, ou quand l'utilisateur demande une relecture, une critique ou une vérification.
---

# Contrôle qualité d'une page

Être un relecteur exigeant : le but est de trouver ce qui ne va pas, pas de confirmer
que c'est bien. Toujours finir par une liste de corrections concrètes, puis les appliquer.

## 1. Regarder
- Lancer `npm run build` puis `npm run preview`.
- Faire des captures à 375 px, 768 px et 1280 px de large (MCP Playwright si disponible). Si aucune capture n'est possible, le dire clairement et
  relire le HTML généré à la place, sans prétendre avoir vu la page.

## 2. Le test des 5 secondes (mobile, 375 px, sans défiler)
- Voit-on ce que fait l'entreprise, où, et comment l'appeler ?
- Le bouton Appeler est-il le premier élément cliquable mis en avant ?
- La disponibilité ou les horaires sont-ils visibles ?

## 3. La chasse au look « IA »
Comparer à la liste de `CLAUDE.md` (polices interdites, dégradés, cartes identiques,
surtitres en majuscules, mot isolé en couleur, numérotation décorative, flèches,
animations au défilement). Puis comparer au brief du secteur : l'idée visuelle et
l'élément signature sont-ils reconnaissables ? Y a-t-il de la décoration en trop à retirer ?

## 3 bis. Les revues des skills externes
- Lancer `/impeccable critique` puis `/impeccable audit` sur la page, et intégrer leurs
  remarques au tableau final. Écarter celles qui contredisent le brief du secteur, en le
  signalant.
- S'il y a des animations et que emil-design-eng est installé, lui faire relire le code
  d'animation (durées, courbes, prefers-reduced-motion).

## 4. Les textes
- Aucun mot banni, aucun superlatif creux, aucun fait inventé.
- Typographie française : espaces insécables avant `: ; ! ?`, guillemets « », apostrophe ’,
  heures « 8 h 30 », majuscules accentuées.
- Boutons formulés par l'action exacte.
- En mode client : zéro `[À VÉRIFIER]`.

## 5. Technique
- Lighthouse (si disponible) : 95+ dans les quatre catégories.
- Images : WebP, dimensions renseignées, `alt` pertinent, pas d'image de plus de 300 Ko.
- Contraste ≥ 4,5:1, focus clavier visible, zones cliquables ≥ 44 px.
- `prefers-reduced-motion` respecté.
- Balises Open Graph et image de partage présentes ; JSON-LD valide.
- Démo : `noindex` présent et bandeau « Maquette de démonstration » visible.
- Pages mentions légales et confidentialité présentes et mises en forme.

## 6. Les trois gammes et le mode démo
- Les trois gammes d'un secteur se distinguent-elles en 10 secondes ? L'Essentiel
  reste-t-il un bon site ? Le Premium est-il nettement plus ambitieux ?
- Menu Modèles : liens corrects, gamme courante mise en évidence, ne recouvre pas la
  barre Appeler, absent si `demo: false`.
- Cadres d'images : chemin, format et prompt complet affichés pour chaque image manquante.
- 3D (Premium) : poster présent, fichier < 2 Mo, Lighthouse toujours ≥ 95.

## 7. Rendu
Un tableau court : point contrôlé, statut (OK / à corriger), correction appliquée.
Terminer par ce qui reste à faire par l'utilisateur (photos, vérifications, validation client).
