import { z } from 'astro/zod';

export const GAMMES = ['essentiel', 'vitrine', 'premium'] as const;
export const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as const;
export const PAGES = [
  'accueil',
  'services',
  'tarifs',
  'realisations',
  'contact',
  'depannage',
  'installation',
  'renovation',
  'artisan',
  'devis',
] as const;

const texte = z.string().min(1, 'texte vide');
const heure = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'heure attendue au format HH:MM');
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'date attendue au format AAAA-MM-JJ');

export const imageSchema = z.object({
  fichier: z
    .string()
    .regex(/^[a-z0-9][a-z0-9-]*\.webp$/, 'nom de fichier en minuscules, sans espace, en .webp'),
  format: z
    .string()
    .regex(/^(\d+:\d+|\d+x\d+)$/, 'format attendu : ratio « 16:9 » ou pixels « 1200x630 »'),
  alt: texte,
  prompt: texte,
});

const plage = z.tuple([heure, heure]);

export const siteSchema = z.looseObject({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug en minuscules et tirets'),
  secteur: z.string().regex(/^[a-z0-9-]+$/, 'secteur en minuscules'),
  gamme: z.enum(GAMMES),
  demo: z.boolean(),
  nom: texte,
  accroche: texte,
  description: z.string().optional(),
  telephone: texte,
  email: z.string().optional(),
  adresse: z.object({ rue: texte, codePostal: texte, ville: texte }),
  horaires: z.object(Object.fromEntries(JOURS.map((j) => [j, z.array(plage)])) as Record<
    (typeof JOURS)[number],
    z.ZodArray<typeof plage>
  >),
  urgences: z
    .object({
      actif: z.boolean(),
      plage: z.string().optional(),
      delai: z.string().optional(),
      /** Situations d'urgence prises en charge (« Fuite d'eau »…) */
      cas: z.array(texte).optional(),
    })
    .optional(),
  fermetureExceptionnelle: z
    .object({ du: date, au: date, message: z.string().optional() })
    .nullable()
    .optional(),
  artisan: z.looseObject({}).optional(),
  zone: z.object({
    rayonKm: z.number().positive().optional(),
    communes: z.array(texte).min(1, 'au moins une commune'),
  }),
  services: z
    .array(
      z.object({
        groupe: texte,
        items: z.array(texte),
        /** Clé d'une entrée de `images` illustrant ce groupe (page Services). */
        image: z.string().optional(),
        /** Premium : clé de la page dédiée à ce groupe (dépannage, installation, rénovation). */
        page: z.enum(PAGES).optional(),
        /** Premium : phrase d'introduction de la page du groupe. */
        intro: z.string().optional(),
        /** Premium : déroulé d'une intervention, étape par étape. */
        deroule: z.array(texte).optional(),
      }),
    )
    .optional()
    .default([]),
  tarifs: z
    .object({
      mention: z.string().optional(),
      devisGratuit: z.boolean().optional(),
      /** Information légale sur les prix des dépannages à domicile (arrêté du 24 janvier 2017). */
      infoPrix: z.string().optional(),
      lignes: z.array(z.object({ libelle: texte, prix: texte })),
    })
    .optional(),
  confiance: z.looseObject({}).optional(),
  reseaux: z.record(z.string(), z.string()).optional(),
  mentionsLegales: z.object({
    formeJuridique: texte,
    siret: texte,
    rcsOuRm: z.string().optional(),
    directeurPublication: texte,
    hebergeur: z.object({ nom: texte, adresse: texte, telephone: z.string().optional() }),
  }),
  pages: z
    .array(z.enum(PAGES))
    .min(1)
    .refine((p) => p.includes('accueil'), 'la page « accueil » est obligatoire'),
  realisations: z
    .array(
      z.looseObject({
        titre: texte,
        avant: z.string().optional(),
        apres: z.string().optional(),
        description: z.string().optional(),
        /** Premium : adresse de la page du chantier (realisations/<slug>/). */
        slug: z
          .string()
          .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug en minuscules et tirets')
          .optional(),
        commune: z.string().optional(),
        duree: z.string().optional(),
        /** Groupe de services concerné (« Rénovation »…) */
        groupe: z.string().optional(),
        contexte: z.string().optional(),
        etapes: z.array(z.object({ titre: texte, texte: z.string().optional() })).optional(),
        materiaux: z.array(texte).optional(),
        /** Clés d'entrées de `images` pour la galerie du chantier. */
        galerie: z.array(z.string()).optional(),
      }),
    )
    .optional()
    .default([]),
  /** Premium : formulaire de demande de devis. Sans `action`, le formulaire n'est relié à rien. */
  devis: z
    .object({
      intro: z.string().optional(),
      /** Adresse du service de formulaire tiers (ex. https://formspree.io/f/…) */
      action: z.url().optional(),
      service: z.string().optional(),
    })
    .optional(),
  images: z.record(z.string(), imageSchema),
  objet3d: z
    .object({
      actif: z.boolean(),
      fichier: z.string(),
      poster: z.string(),
      page: z.enum(PAGES),
      /** Description de l'objet, lue par les lecteurs d'écran et affichée en légende. */
      alt: texte,
      credit: z.string().optional(),
    })
    .optional(),
});

export type Site = z.infer<typeof siteSchema>;
export type ImageSite = z.infer<typeof imageSchema>;
export type Gamme = (typeof GAMMES)[number];
export type Jour = (typeof JOURS)[number];
export type CleePage = (typeof PAGES)[number];
