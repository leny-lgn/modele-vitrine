// Fiche contact (vCard 3.0) : « Enregistrer mon contact » sur la page Contact.
// Tout vient de moi.json ; rien n'est publié si le téléphone n'est pas encore renseigné.
import type { APIRoute } from 'astro';
import { MOI, NOM, aCompleter } from '../lib/moi';
import { telHref } from '../lib/typo-fr';

const echapper = (t: string) => t.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');

export const GET: APIRoute = ({ site }) => {
  const [prenom, ...reste] = MOI.nom.split(' ');
  const lignes = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${echapper(reste.join(' '))};${echapper(prenom ?? '')};;;`,
    `FN:${echapper(MOI.nom)}`,
    NOM !== MOI.nom ? `ORG:${echapper(NOM)}` : '',
    'TITLE:Création de sites internet',
    aCompleter(MOI.telephone) ? '' : `TEL;TYPE=CELL,VOICE:${telHref(MOI.telephone).replace(/^tel:/, '')}`,
    aCompleter(MOI.email) ? '' : `EMAIL;TYPE=INTERNET:${MOI.email}`,
    site ? `URL:${site.href}` : '',
    'END:VCARD',
  ].filter(Boolean);
  return new Response(lignes.join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
};
