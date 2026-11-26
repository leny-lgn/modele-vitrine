# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Commerçants et artisans indépendants de Bretagne (secteurs de Lannion, Brest et Nantes),
sans site ou avec un site daté. Deux situations :
1. **Le curieux**, sur téléphone, souvent juste après un appel ou un SMS : veut voir un
   modèle de son métier et un ordre de prix, puis rappeler.
2. **Le décidé**, souvent sur ordinateur, pendant ou après le rendez-vous : compare les
   trois gammes, lit comment ça se passe, vérifie le sérieux.

## Product Purpose
Le site personnel de l'auteur du dépôt : présenter qui il est, ce qu'il fait, pour qui,
combien ça coûte, montrer les modèles de démonstration, et obtenir un appel.
Succès : en 10 secondes sur mobile, on sait qui, quoi, combien, et on peut appeler.

## Positioning
Un étudiant qui crée, à côté de ses études, des sites vitrines pour les commerces de son
coin : il vient sur place quand c'est possible (sinon téléphone ou visio), s'occupe de tout,
et le site appartient au client. Preuve unique :
des modèles complets par métier, en trois gammes, consultables en vrai.

## Operating Context
Premier contact par appel, SMS, carte de visite ou Google. Premier échange de 20 minutes,
sur place quand c'est possible, sinon au téléphone ou en visio ; devis gratuit valable 30 jours,
puis contenus, première version, mise en ligne.
Abonnement mensuel sans engagement pour l'hébergement et les petites modifications.

## Capabilities and Constraints
- Pages : `/`, `/modeles/`, `/tarifs/`, `/contact/`, `/mentions-legales/`, `/confidentialite/`.
- Toutes les données viennent de `src/data/moi.json` ; les modèles de `src/sites/`.
- Nom commercial : Haute-Lice (hautelice.fr, contact@hautelice.fr). Prix, téléphone et adresse
  renseignés ; SIRET en cours d'attribution. Tant que `publie` est false, site en `noindex`
  (plus de bandeau « Site en préparation »).
- Pas de barre « Appeler » fixe sur le site personnel (les démos gardent la leur).
- Stack et règles du dépôt : voir CLAUDE.md (Astro statique, CSS à la main, polices
  auto-hébergées, aucun traceur, Lighthouse 95+).

## Brand Commitments
- Ton : « Un artisan du web local : simple, direct, soigneux. » Pas d'agence, pas de jargon,
  il parle comme au téléphone. Tutoiement exclu côté client : vouvoiement.
- Style nettement différent des modèles de secteur ; polices différentes des leurs
  (le plombier utilise Archivo) et hors liste interdite de CLAUDE.md.
- Palette sombre « la devanture » : gris anthracite bleuté, boiseries, texte ivoire, et une seule
  couleur d'accent, le doré en aplat. Ni bleu « tech » ni violet vif en accent, ni dégradé.

## Evidence on Hand
- Les modèles de démonstration (entreprises fictives, présentées comme telles).
- Aucun client réel pour l'instant : section Réalisations masquée. Aucun avis, aucun
  chiffre de clientèle. Photo de l'auteur facultative, pas encore fournie.

## Product Principles
1. Montrer plutôt que promettre : les modèles sont la preuve.
2. Le prix et le téléphone ne se cherchent jamais.
3. Honnêteté totale : étudiant, débutant, entreprises fictives assumées.
4. Proximité réelle : il vient sur place quand c'est possible, sinon téléphone ou visio.
