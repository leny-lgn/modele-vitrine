# Brief : ton site à toi (accueil + modèles)

## Rôle du site
C'est ta carte de visite en ligne. Un commerçant y arrive par un SMS, ta carte de visite
ou Google. En 10 secondes, il doit comprendre : qui tu es, ce que tu fais, pour qui,
combien ça coûte, et comment voir des exemples. Puis il doit pouvoir t'appeler.

Deux publics :
1. **Le commerçant curieux** (sur mobile, souvent après ton appel) : veut voir des
   modèles de son secteur et un ordre de prix, puis te rappeler.
2. **Le commerçant décidé** (souvent sur ordinateur, pendant ou après le rendez-vous) :
   compare les gammes, lit comment ça se passe, vérifie que tu es sérieux.

## Ton, en une phrase
**« Un artisan du web local : simple, direct, soigneux. »** Pas d'agence, pas de jargon,
pas de promesses marketing. Tu parles comme tu parles au téléphone.

## Idée visuelle (point de départ, à confronter à 2 autres directions)
**« Le nuancier »** : le site présente tes modèles comme un nuancier ou un catalogue
d'échantillons. Chaque secteur a sa bande de couleur tirée de son thème (cuivre et
ardoise pour le plombier, etc.). Autour, ton site reste très sobre : fond blanc papier,
texte noir encre, une seule couleur d'accent qui t'appartient. Le seul élément coloré
de la page, ce sont les échantillons de tes modèles : ils prouvent ton travail.

Contraintes :
- Style nettement différent de tous les modèles de démo (ce n'est pas un 16e modèle).
- Polices hors liste interdite de CLAUDE.md, et différentes de celles des secteurs.
- Une seule couleur d'accent, choisie pour toi (ni bleu « tech », ni violet vif, ni dégradé).

## Palette retenue (15 novembre 2026) : « la devanture »
Remplace le fond blanc papier ci-dessus. Le site est sombre, comme une devanture de
commerce : façade gris anthracite bleuté (#151A1C, bandes #0E1214), panneaux #1F2629,
boiseries (#5B4325 : bandeau de menu, et en enseigne fine portant le titre « Tarifs » ;
depuis le 26 novembre 2026, le contenu des tarifs reste sur l'ardoise), texte ivoire (#EFE8D8).
Accent unique : doré #C9A44C, en aplat (rubriques en lettres d'enseigne, bouton Appeler,
cadre de ton annonce). Jamais de dégradé métallisé, jamais de violet ou bleu vif en accent.
La structure « annuaire » (rubriques, points de conduite, tailles d'annonce) est conservée.

## Structure de l'accueil (`/`)
```
┌───────────────────────────────────────────────┐
│ [Ton nom]            Modèles  Tarifs  Contact │
├───────────────────────────────────────────────┤
│ Je crée des sites internet pour les           │
│ commerçants et artisans de [ville].           │
│ [Appeler le 06 …]   [Voir les modèles]        │
├───────────────────────────────────────────────┤
│ MODÈLES : le nuancier                         │
│ Plombier ▮▮▮  Essentiel · Vitrine · Premium   │
│ (capture + 3 liens par secteur)               │
│ → Tous les modèles                            │
├───────────────────────────────────────────────┤
│ OFFRES : 3 colonnes Essentiel/Vitrine/Premium │
│ + abonnement mensuel + options                │
├───────────────────────────────────────────────┤
│ COMMENT ÇA SE PASSE : 5 étapes, délais        │
├───────────────────────────────────────────────┤
│ QUI JE SUIS : photo (facultative), 4 lignes   │
├───────────────────────────────────────────────┤
│ RÉALISATIONS : vrais clients (masqué si vide) │
├───────────────────────────────────────────────┤
│ QUESTIONS FRÉQUENTES : 5 à 6 questions        │
├───────────────────────────────────────────────┤
│ CONTACT : téléphone, e-mail, zone, horaires   │
└───────────────────────────────────────────────┘
Mobile : pas de barre « Appeler » fixe (décision du 26 novembre 2026) : le bouton Appeler du bandeau suffit.
```

## Questions fréquentes à prévoir
- Combien de temps pour avoir mon site ?
- Est-ce que le site m'appartient ?
- Que comprend l'abonnement, et puis-je l'arrêter ?
- Je n'ai pas de photos ni de textes, comment on fait ?
- J'ai déjà une page Facebook, à quoi sert un site ?
- Est-ce que je pourrai modifier mes horaires ou mes tarifs ?

## Pages
- `/` accueil
- `/modeles/` : grille complète des modèles, par secteur (le nuancier en grand)
- `/tarifs/` : détail des gammes, options, abonnement, conditions (lien vers CGV si publiées)
- `/contact/`
- `/mentions-legales/`, `/confidentialite/` (textes : onglet « Mentions de ton site »
  de tes modèles de documents)

## Lien avec les démos
- Les démos passent sous `/modeles/<slug>/` (ex. `/modeles/plombier-premium/`).
  Redirections depuis les anciennes adresses (`/plombier-premium/` → nouvelle adresse).
- Le menu « Modèles » des démos gagne un lien « Retour au site de [ton nom] ».
- Démos : `noindex` (inchangé). Accueil et pages perso : indexables, dans le sitemap.
  Ne pas bloquer les démos dans robots.txt (sinon Google ne voit pas leur noindex).

## Honnêteté
- Les démos sont présentées comme des **modèles avec des entreprises fictives**.
- La section Réalisations ne montre que de vrais clients, avec leur accord.
- Pas de faux avis, pas de chiffres inventés (« 50 clients satisfaits »).

## Avant publication
Tant que `publie` vaut false dans `src/data/moi.json` : `noindex` partout (le bandeau
« Site en préparation » a été retiré le 26 novembre 2026, à la demande de l'auteur). La construction refuse `publie: true` s'il reste un
`[À COMPLÉTER]` (SIRET, prix, téléphone…).
