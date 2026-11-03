---
name: adapter-enseigne
description: Adapte un modèle existant (secteur + gamme) à un vrai commerce à partir de sa fiche (nom, coordonnées, horaires, services, style) — démo personnalisée pour un prospect intéressé, ou base d'un site client. À utiliser quand l'utilisateur nomme une vraie enseigne. Pour un nouveau secteur fictif, utiliser plutôt nouveau-secteur.
---

# Adapter un modèle à une vraie enseigne

## 1. Rassembler les entrées
Obligatoires : nom, secteur, gamme (`essentiel` | `vitrine` | `premium`), ville,
téléphone, horaires, au moins 3 services.
Utiles : adresse, zone desservie, tarifs, qualifications, réalisations, style souhaité,
couleurs du logo, réseaux sociaux, ce qui distingue ce commerce.
S'il manque une information obligatoire, la demander en UNE question groupée.

## 2. Partir du modèle
1. Lire `docs/briefs/<secteur>.md`.
2. Copier `src/sites/<secteur>-<gamme>.json` sous un nouveau slug :
   nom en minuscules sans accents, tirets, + suffixe aléatoire de 4 caractères pour une
   démo de prospect (ex. `plomberie-martin-x7k2`).

## 3. Remplir
- Textes courts au ton du métier, liste de mots bannis de `CLAUDE.md` respectée.
- Ne jamais inventer : tout fait inconnu = `[À VÉRIFIER]` avec ce qu'il faut vérifier.
- Pas d'avis sauf vrais avis fournis.
- Garder exactement les pages et sections de la gamme choisie.
- `demo: true` pour un prospect ; `demo: false` seulement pour un site client validé.
- Images : garder les prompts du modèle en les adaptant au commerce ; pour un client,
  rappeler que ses vraies photos remplacent les images générées.

## 4. Vérifier puis rendre
- `npm run build`, puis skill `controle-qualite`.
- Rendre : adresse du site, `[À VÉRIFIER]` restants, images à fournir, trois lignes sur
  les choix faits, et les commandes Git à lancer par l'utilisateur.
