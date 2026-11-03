# Brief de direction artistique : plombier

## Qui visite le site, et pourquoi
1. **Urgence** (fuite, WC bouché, plus d'eau chaude) : sur mobile, stressé, veut appeler
   dans les 10 secondes. Il cherche : est-ce qu'il intervient chez moi, et quand ?
2. **Projet** (salle de bain, chauffe-eau, rénovation) : compare 2 ou 3 artisans, veut
   être rassuré : réalisations, tarifs clairs, certifications, avis, devis.

Le site doit servir les deux : un chemin court pour l'urgence, de la preuve pour le projet.
La confiance est le vrai sujet : le dépannage est un secteur où les clients craignent
les arnaques. Transparence des prix et identité claire de l'artisan = argument n°1.

## Idée visuelle en une phrase
**« Le carnet de chantier d'un artisan soigneux : cuivre, laiton, carrelage blanc et trait précis. »**

## Palette (tokens)
| Nom            | Hex      | Usage                                          |
|----------------|----------|------------------------------------------------|
| `--blanc-zinc` | #F2F3F1  | Fond principal (blanc légèrement froid)        |
| `--ardoise`    | #1F2A30  | Texte, fonds de section sombres                |
| `--gris-joint` | #8A9499  | Textes secondaires, traits                     |
| `--cuivre`     | #B4622F  | Accent unique : bouton Appeler, liens, détails |
| `--laiton`     | #C9A24A  | Touche rare (badges certifications)            |
| `--vert-ok`    | #2E7D5B  | Indicateur « Disponible maintenant » seulement |

Vérifier les contrastes : le texte blanc sur `--cuivre` doit atteindre 4,5:1 (foncer le cuivre si besoin).

## Typographie
- Titres : **Archivo**, largeur condensée (`font-stretch` 75 % à 87,5 %), graisse 700–800.
  Évoque les plaques et la signalétique technique, robuste sans être agressive.
- Texte : **Archivo** largeur normale, 400/500. Une seule famille, deux largeurs.
- Chiffres tabulaires (`font-variant-numeric: tabular-nums`) dans les tarifs et horaires.
- Échelle : ratio 1,25 ; corps 17 px mobile / 18 px bureau ; interlignage 1,55.

## Élément signature (un seul)
**Le tracé de tuyauterie** : une ligne fine continue couleur cuivre (2 px), avec des
coudes à 90° et des raccords arrondis, qui court le long de la page et relie les
sections, comme un plan d'installation. Dessinée en SVG, elle se « remplit » une seule
fois au chargement du hero, puis reste fixe. Sur mobile : un simple trait vertical à
gauche. Rien d'autre de décoratif sur la page.

## Structure de la page (gamme Vitrine)
```
┌──────────────────────────────────────────┐
│ Nom + téléphone (fixé en haut, bureau)   │
├──────────────────────────────────────────┤
│ HERO                                     │
│ Photo de chantier pleine largeur         │
│ « Plombier à [ville] et 15 km autour »   │
│ ● Disponible maintenant / Rappel 8 h     │
│ [ Appeler le 02 00 00 00 00 ]  (cuivre)  │
│ [ Demander un devis ]  (contour)         │
├──────────────────────────────────────────┤
│ URGENCES : liste courte des dépannages   │
│ + délai réel annoncé (si fourni)         │
├──────────────────────────────────────────┤
│ SERVICES : 2 colonnes de texte, pas de   │
│ cartes. Dépannage | Installation | Réno  │
├──────────────────────────────────────────┤
│ TARIFS « à partir de », tableau sobre    │
├──────────────────────────────────────────┤
│ RÉALISATIONS : avant / après (curseur)   │
├──────────────────────────────────────────┤
│ ZONE : liste des communes + carte stat.  │
├──────────────────────────────────────────┤
│ CONFIANCE : l'artisan (mains, de dos),   │
│ qualifications, assurance, 3 vrais avis  │
├──────────────────────────────────────────┤
│ CONTACT : téléphone, horaires, adresse   │
└──────────────────────────────────────────┘
Mobile : barre fixe en bas « Appeler » (pleine largeur, cuivre).
```
Alignement : texte aligné à gauche partout, titres compris.

## Les trois gammes (trois sites distincts)

### Essentiel — « On vous trouve et on vous appelle »
- Une seule page, rapide, sans élément signature.
- Hero simple : fond `--ardoise` uni (pas de grande photo), nom, accroche, disponibilité,
  gros bouton Appeler. Puis : urgences (liste), services (liste courte), zone, horaires, contact.
- 3 à 4 images au maximum. Typographie et palette du secteur, soignées.

### Vitrine — « On vous choisit plutôt qu'un autre »
- La structure complète décrite ci-dessus, avec le tracé de tuyauterie.
- Pages : Accueil, Services, Tarifs, Réalisations, Contact.
- Avant/après, tableau des tarifs, zone d'intervention, avis.

### Premium — « On se souvient de vous »
- Mise en page éditoriale : hero photo plein écran avec titre très grand en Archivo
  condensé, sections asymétriques, beaucoup d'espace.
- Le tracé de tuyauterie devient le fil conducteur de tout le site : il relie les pages
  (repris en haut de chaque page interne) et se dessine une seule fois au chargement.
- Pages : Accueil, Dépannage, Installation, Rénovation, Réalisations (une page par
  chantier), L'artisan, Devis.
- Formulaire de demande de devis (service de formulaire tiers à choisir ; en démo,
  formulaire non relié et signalé comme tel).
- Option 3D : un raccord en cuivre en `<model-viewer>` dans la page L'artisan ou en
  ouverture de la page Installation. Jamais dans le hero.

## Fonctions propres au plombier
- **Indicateur de disponibilité** calculé depuis les horaires (« Disponible maintenant » /
  « Fermé — rappel à partir de 8 h »). Si `urgences.actif` est vrai, afficher sa plage.
- **Curseur avant / après** sur les réalisations (au doigt et au clavier).
- **Zone d'intervention** : liste des communes en texte (bon pour Google) + carte statique.
- **Tableau des tarifs** clair. « Devis gratuit » seulement si `devisGratuit` est vrai.

## À éviter absolument
- Bleu « eau » + gouttes + clé à molette en clipart, plombier cartoon, mascotte.
- Rouge clignotant « SOS URGENCE 24/7 », compte à rebours, faux sentiment d'urgence.
- Promesses non fournies par l'artisan (« intervention en 30 min », « le moins cher »).
- Photos de banque trop parfaites (salle de bain de magazine).

## Points légaux à signaler (ne pas inventer)
- Assurance décennale et qualifications : affichées seulement si fournies, avec leurs références.
- Information sur les prix des dépannages à domicile : règles spécifiques (arrêté du
  24 janvier 2017) — marquer `[À VÉRIFIER]` et laisser l'utilisateur confirmer.
