---
name: nouveau-secteur
description: Ajoute un nouveau secteur de démonstration (boulangerie, coiffeur, restaurant…) : rédige son brief de direction artistique avec l'utilisateur, son bloc de style d'images, son thème CSS, puis ses trois sites Essentiel, Vitrine et Premium. À utiliser quand l'utilisateur veut des modèles pour un secteur qui n'a pas encore de fichier dans docs/briefs/.
---

# Ajouter un secteur

## 1. Le brief (avec l'utilisateur, avant tout code)
1. Lire `docs/briefs/plombier.md` : c'est la structure de référence.
2. Poser en une seule fois les questions utiles : quel type de commerce exact, qui sont
   ses clients, ce qu'ils cherchent en arrivant sur le site, des références qu'il aime.
3. Proposer 3 idées visuelles différentes en une phrase chacune, avec palette, duo de
   polices (hors liste interdite de CLAUDE.md) et élément signature. Critiquer chacune :
   qu'est-ce qui fait encore générique pour ce secteur ? Laisser l'utilisateur choisir.
4. Écrire `docs/briefs/<secteur>.md` : visiteurs, idée visuelle, palette, typographie,
   élément signature, structure, les trois gammes, fonctions propres, à éviter, points légaux.
5. Écrire `docs/images/<secteur>-style.txt` (bloc de style des images, une ligne).

## 2. Le thème
Créer `src/themes/<secteur>.css` avec les tokens du brief. Vérifier les contrastes.

## 3. Les trois sites
Créer `src/sites/<secteur>-essentiel.json`, `-vitrine.json`, `-premium.json` en partant
des fichiers plombier pour la structure, avec un commerce fictif crédible (coordonnées
manifestement fictives : 02 00 00 00 00, code postal 00000, e-mail en .example).
Chaque image a `fichier`, `format`, `alt` et un `prompt` écrit pour ce secteur.
Construire les composants spécifiques au secteur si le brief en demande.

## 4. Vérifier et rendre
- `npm run build`, puis skill `controle-qualite` sur les trois sites.
- Vérifier que le menu Modèles affiche bien le nouveau secteur.
- Rendre : adresses des trois sites, `npm run images` (liste des images à produire),
  les `[À VÉRIFIER]` restants, et les commandes Git à lancer par l'utilisateur.
