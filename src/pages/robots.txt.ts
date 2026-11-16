// robots.txt : rien n'est bloqué, volontairement. Les démos portent un noindex :
// si elles étaient bloquées ici, Google ne pourrait pas lire ce noindex.
import type { APIRoute } from 'astro';
import { PUBLIE } from '../lib/moi';

export const GET: APIRoute = ({ site }) => {
  const lignes = ['User-agent: *', 'Allow: /'];
  if (PUBLIE) lignes.push('', `Sitemap: ${new URL('/sitemap.xml', site).href}`);
  return new Response(lignes.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
