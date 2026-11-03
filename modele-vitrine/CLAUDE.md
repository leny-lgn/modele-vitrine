# Modèles de sites vitrines pour commerces et artisans

Ce dépôt produit des **sites de démonstration distincts** : pour chaque secteur
(plombier, boulangerie…), trois gammes — **Essentiel**, **Vitrine**, **Premium** —
chacune étant un site complet, indépendant, à sa propre adresse.
Un menu « Modèles », visible seulement en mode démo, permet de passer d'un site à l'autre.
Premier secteur : **plombier** (brief : `docs/briefs/plombier.md`).

## Stack
- Astro, sortie 100 % statique. Pas de framework JS côté client.
- CSS écrit à la main avec des variables (tokens). Pas de Tailwind, pas de librairie UI.
- JS uniquement pour les petites fonctions utiles, en scripts Astro légers.
  Le site reste lisible si le JS est désactivé.
- Hébergement : Cloudflare Workers avec static assets (`wrangler.jsonc`, dossier `dist`).
- Polices auto-hébergées dans `public/fonts/`. Jamais de Google Fonts en ligne.

## Architecture
- `src/sites/<secteur>-<gamme>.json` : un fichier = un site. Champs obligatoires :
  `slug`, `secteur`, `gamme` (`essentiel` | `vitrine` | `premium`), `demo`.
  Fichiers commençant par `_` ignorés. Schéma de validation zod : la construction
  échoue si un champ obligatoire manque.
- `src/themes/<secteur>.css` : tokens communs aux trois gammes d'un secteur.
- `src/layouts/<gamme>/` : mise en page propre à chaque gamme. Les trois gammes doivent
  être visiblement différentes (voir « Les trois gammes »).
- `src/components/commun/` : Appeler, Horaires, Disponibilite, Carte, PiedDePage, SEO.
- `src/components/vitrine/` et `src/components/premium/` : composants propres à une gamme.
- `src/components/demo/` : MenuModeles, BandeauDemo, CadreImage. Jamais rendus si `demo: false`.
- `src/pages/[site]/` : pages de chaque site (index, pages internes selon la gamme,
  mentions-legales, confidentialite). Liens internes toujours relatifs au site.
- `src/pages/index.astro` : grille de tous les modèles, groupés par secteur (démo uniquement).
- `public/images/<slug>/`, `public/models/<slug>/` (fichiers .glb), `public/fonts/`.

## Les trois gammes
| | Essentiel | Vitrine | Premium |
|---|---|---|---|
| Pages | 1 | 4 à 5 | 5 à 7 + réalisations détaillées |
| Mise en page | simple, efficace | brief complet du secteur | éditoriale, direction artistique poussée |
| Élément signature | aucun | celui du brief | celui du brief, développé |
| Fonctions | Appeler, horaires, carte, zone | + disponibilité, tarifs, avant/après, avis | + formulaire de devis, galerie riche, 3D légère éventuelle |

L'Essentiel doit rester un bon site, jamais volontairement appauvri. Les trois gammes
partagent les tokens du secteur, la typographie française, les pages légales et les
fonctions de base.

## Menu « Modèles » (démo uniquement)
- Barre discrète fixée en bas d'écran, visuellement séparée du site (fond neutre, petite taille).
- Sélecteur de secteur + trois boutons de gamme (gamme courante mise en évidence)
  + lien vers la grille de tous les modèles + bouton « Masquer » (mémorisé en sessionStorage).
- Générée automatiquement depuis `src/sites/` : aucun lien écrit à la main.
- Ne doit jamais masquer la barre « Appeler » mobile : les empiler proprement.

## Cadres d'images (démo uniquement)
- Chaque image est décrite dans la config : `fichier`, `format` (ex. `16:9`), `alt`, `prompt`.
- Composant `CadreImage` : si `public/images/<slug>/<fichier>` existe, afficher l'image
  normalement (WebP, srcset, dimensions). Sinon, afficher à sa place un cadre en
  pointillés aux bonnes proportions avec : le chemin exact où déposer le fichier,
  le format et les dimensions conseillées, puis le prompt complet = bloc de style du
  secteur (`docs/images/<secteur>-style.txt`) + prompt de l'image, avec un bouton « Copier ».
- Script `npm run images` : liste dans le terminal toutes les images manquantes de tous
  les sites, avec chemin, format et prompt complet.
- Écrire les prompts en français, sans texte ni logo dans l'image, sans visage reconnaissable.

## 3D (gamme Premium uniquement, optionnelle)
- Un seul objet lié au métier, affiché avec `<model-viewer>` : chargement différé,
  `poster` (image d'aperçu) obligatoire, rotation au doigt, pas de rotation automatique rapide.
- Fichier `.glb` < 2 Mo dans `public/models/<slug>/`. Sur mobile, le poster seul suffit si besoin.
- Si le MCP Blender est disponible : demander confirmation avant toute exécution de code
  dans Blender, rappeler à l'utilisateur de sauvegarder sa scène, exporter en glTF binaire (.glb).
- Licence : vérifier et afficher le crédit si un modèle vient d'un service tiers (ex. CC BY).

## Règles absolues
1. Aucun contenu propre à un commerce codé en dur dans un composant : tout vient du JSON.
2. Ne jamais inventer de fait : année, certification (RGE, Qualibat, PG…), assurance, prix,
   délai d'intervention, avis, nombre de clients. Inconnu = `[À VÉRIFIER]`.
   Si `demo: false`, la construction échoue s'il reste un `[À VÉRIFIER]`.
3. Jamais de faux avis ni de chiffres inventés. En démo, la section avis montre des
   emplacements clairement marqués « Exemple d'avis » ou reste masquée.
4. `demo: true` : `<meta name="robots" content="noindex">`, BandeauDemo
   (« Modèle de démonstration — entreprise fictive »), MenuModeles, CadreImage actifs.
5. Mobile d'abord : téléphone cliquable et disponibilité visibles sans défiler à 375 px.
6. Avant de déclarer une tâche finie : `npm run build` sans erreur ni avertissement, puis
   skill `controle-qualite` (captures 375 px et 1280 px via le MCP Playwright si disponible).
7. Ne jamais faire `git push` : c'est l'utilisateur qui pousse.

## Skills de design
- **Impeccable** : skill de design principal. Ses règles s'appliquent, mais le brief du
  secteur prime toujours sur ses préférences (palette, polices, élément signature).
  Utiliser `/impeccable critique` et `/impeccable audit` pendant le contrôle qualité.
- **emil-design-eng** (si installé) : pour toute animation (tracé de tuyauterie,
  curseur avant/après, transitions). Justifier durée et courbe avant de coder.
- Skills maison : `nouveau-secteur`, `adapter-enseigne`, `controle-qualite`.
- En cas de conflit entre deux règles : CLAUDE.md > brief du secteur > skills externes.

## Qualité visuelle : éviter le look « généré par IA »
Suivre le brief du secteur à la lettre. Là où il laisse un choix libre, ne pas retomber sur :
- Polices interdites : Inter, Roboto, Poppins, Montserrat, Open Sans, Lato, Playfair Display.
- Dégradés décoratifs, halos lumineux, fond quasi noir avec accent fluo.
- Fond crème + serif + accent terracotta (cliché de génération).
- Grilles de cartes identiques arrondies avec la même ombre grise.
- Surtitres en MAJUSCULES espacées au-dessus de chaque titre ; mot isolé en italique ou
  en couleur dans un titre ; numérotation 01/02/03 décorative ; « → » ajouté aux boutons.
- Emojis, icônes génériques dans les titres.
- Animations au défilement sur chaque section. Une seule animation orchestrée maximum
  (chargement du hero). Respecter `prefers-reduced-motion`.

## Textes
- Français, phrases courtes, ton du métier. Des faits plutôt que des adjectifs.
- Mots bannis : « Bienvenue sur notre site », « n'hésitez pas », « découvrez », « passionné »,
  « savoir-faire unique », « au cœur de », « expérience inoubliable », « qualité et
  professionnalisme », « nous mettons tout en œuvre », « votre satisfaction est notre
  priorité », « solutions sur mesure ».
- Boutons : verbe d'action exact (« Appeler le 02 00 00 00 00 », « Demander un devis »).

## Typographie française (obligatoire)
- Espace fine insécable (U+202F) avant `; ! ?`, insécable (U+00A0) avant `:` et dans « ».
- Apostrophe ’, points de suspension …, majuscules accentuées.
- Heures « 8 h 30 » ; téléphone groupé par deux avec espaces insécables.
- `<html lang="fr">`, `hyphens: auto`. Fonction `typoFr()` (src/lib/typo-fr.ts)
  appliquée à tous les textes issus du JSON.

## Technique
- Lighthouse 95+ dans les quatre catégories, Premium compris.
- Images : WebP, width/height, srcset 400/800/1600, lazy sauf hero, alt obligatoire.
- Contraste ≥ 4,5:1, focus visible, zones cliquables ≥ 44 px.
- Open Graph + image de partage 1200×630 par site. JSON-LD adapté au secteur
  (`Plumber` pour le plombier) avec `areaServed`.
- Favicon par site, page 404 au style du dépôt. Carte = image statique cliquable.
- Aucun cookie, aucun traceur.

## Commandes
- `npm run dev` · `npm run build` · `npm run preview` · `npx astro check` · `npm run images`
