// Plan du site : uniquement les pages du site personnel. Les démos (noindex) n'y figurent pas.
// Tant que le site n'est pas publié (moi.json, publie: false), le plan est vide.
import type { APIRoute } from 'astro';
import { PAGES_PERSO } from '../lib/liens';
import { PUBLIE } from '../lib/moi';

export const GET: APIRoute = ({ site }) => {
  const urls = PUBLIE ? PAGES_PERSO.map((chemin) => `  <url><loc>${new URL(chemin, site).href}</loc></url>`) : [];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
