// Chargement, validation et préparation des fichiers src/sites/*.json.
// Toute erreur ici fait échouer la construction, avec un message lisible.
import { siteSchema, GAMMES, type Site, type Gamme } from './schema';
import { typoFr } from './typo-fr';

const A_VERIFIER = '[À VÉRIFIER]';

// Clés dont la valeur est technique : jamais transformée par typoFr.
const CLES_TECHNIQUES = new Set([
  'slug',
  'secteur',
  'gamme',
  'fichier',
  'poster',
  'format',
  'email',
  'telephone',
  'horaires',
  'pages',
  'reseaux',
  'avant',
  'apres',
  'image',
  'page',
  'galerie',
  'action',
  'prompt',
  'du',
  'au',
  'codePostal',
  'siret',
]);

function appliquerTypo<T>(valeur: T, cle?: string): T {
  if (cle && CLES_TECHNIQUES.has(cle)) return valeur;
  if (typeof valeur === 'string') return typoFr(valeur) as T;
  if (Array.isArray(valeur)) return valeur.map((v) => appliquerTypo(v)) as T;
  if (valeur && typeof valeur === 'object') {
    return Object.fromEntries(
      Object.entries(valeur).map(([k, v]) => [k, appliquerTypo(v, k)]),
    ) as T;
  }
  return valeur;
}

function cheminsAVerifier(valeur: unknown, chemin: string[] = []): string[] {
  if (typeof valeur === 'string') return valeur.includes(A_VERIFIER) ? [chemin.join('.')] : [];
  if (Array.isArray(valeur)) return valeur.flatMap((v, i) => cheminsAVerifier(v, [...chemin, String(i)]));
  if (valeur && typeof valeur === 'object') {
    return Object.entries(valeur).flatMap(([k, v]) => cheminsAVerifier(v, [...chemin, k]));
  }
  return [];
}

function formaterChemin(path: PropertyKey[]): string {
  return path.map((p) => (typeof p === 'number' ? `[${p}]` : String(p))).join('.').replace(/\.\[/g, '[');
}

function valider(fichier: string, brut: unknown): Site {
  const resultat = siteSchema.safeParse(brut, {
    error: (iss) => (iss.input === undefined ? 'champ manquant' : undefined),
  });
  if (!resultat.success) {
    const lignes = resultat.error.issues.map(
      (i) => `  - ${formaterChemin(i.path) || '(racine)'} : ${i.message}`,
    );
    throw new Error(`\n\nFichier de site invalide : ${fichier}\n${lignes.join('\n')}\n`);
  }
  const site = resultat.data;
  const erreurs: string[] = [];

  const attendu = fichier.split('/').pop()!.replace(/\.json$/, '');
  if (site.slug !== attendu) erreurs.push(`slug « ${site.slug} » différent du nom du fichier « ${attendu} »`);
  if (!site.slug.startsWith(`${site.secteur}-`))
    erreurs.push(`le slug doit commencer par le secteur « ${site.secteur}- »`);

  site.realisations.forEach((r, i) => {
    for (const cle of ['avant', 'apres'] as const) {
      const ref = r[cle];
      if (ref && !site.images[ref]) erreurs.push(`realisations[${i}].${cle} : image « ${ref} » absente de « images »`);
    }
  });

  const slugsChantiers = new Set<string>();
  site.realisations.forEach((r, i) => {
    (r.galerie ?? []).forEach((ref, j) => {
      if (!site.images[ref]) erreurs.push(`realisations[${i}].galerie[${j}] : image « ${ref} » absente de « images »`);
    });
    if (r.slug) {
      if (slugsChantiers.has(r.slug)) erreurs.push(`realisations[${i}].slug « ${r.slug} » utilisé deux fois`);
      slugsChantiers.add(r.slug);
    }
  });
  if (site.gamme === 'premium' && site.pages.includes('realisations')) {
    site.realisations.forEach((r, i) => {
      if (!r.slug) erreurs.push(`realisations[${i}].slug : obligatoire en gamme Premium (une page par chantier)`);
    });
  }

  site.services.forEach((g, i) => {
    if (g.image && !site.images[g.image]) erreurs.push(`services[${i}].image : image « ${g.image} » absente de « images »`);
  });

  if (!site.demo) {
    const restants = cheminsAVerifier(brut);
    if (restants.length) {
      erreurs.push(
        `demo: false mais il reste ${restants.length} ${A_VERIFIER} :\n${restants.map((c) => `      · ${c}`).join('\n')}`,
      );
    }
  }

  if (erreurs.length) {
    throw new Error(`\n\nFichier de site invalide : ${fichier}\n${erreurs.map((e) => `  - ${e}`).join('\n')}\n`);
  }
  return appliquerTypo(site);
}

const modules = import.meta.glob<{ default: unknown }>('../sites/*.json', { eager: true });

const SITES: Site[] = Object.entries(modules)
  .filter(([chemin]) => !chemin.split('/').pop()!.startsWith('_'))
  .map(([chemin, mod]) => valider(chemin.replace('../', 'src/'), mod.default))
  .sort((a, b) => a.secteur.localeCompare(b.secteur) || GAMMES.indexOf(a.gamme) - GAMMES.indexOf(b.gamme));

{
  const vus = new Map<string, string>();
  for (const s of SITES) {
    const cle = `${s.secteur}/${s.gamme}`;
    if (vus.has(cle)) throw new Error(`Deux sites pour ${cle} : ${vus.get(cle)} et ${s.slug}`);
    vus.set(cle, s.slug);
  }
}

export function tousLesSites(): Site[] {
  return SITES;
}

export function sitesDemo(): Site[] {
  return SITES.filter((s) => s.demo);
}

export function siteParSlug(slug: string): Site {
  const site = SITES.find((s) => s.slug === slug);
  if (!site) throw new Error(`Site inconnu : ${slug}`);
  return site;
}

/** Sites de démo groupés par secteur : { plombier: { essentiel, vitrine, premium } } */
export function sitesParSecteur(): Map<string, Partial<Record<Gamme, Site>>> {
  const groupes = new Map<string, Partial<Record<Gamme, Site>>>();
  for (const s of sitesDemo()) {
    const g = groupes.get(s.secteur) ?? {};
    g[s.gamme] = s;
    groupes.set(s.secteur, g);
  }
  return groupes;
}

export { A_VERIFIER };
