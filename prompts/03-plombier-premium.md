# Prompt 3 — Plombier Premium

---

Troisième site : `src/sites/plombier-premium.json`, gamme Premium du brief plombier.

1. Plan de design spécifique au Premium avec Impeccable : mise en page éditoriale,
   hero photo plein écran, très grande typographie condensée, sections asymétriques,
   tracé de tuyauterie comme fil conducteur entre les pages. Propose 2 directions,
   critique-les, laisse-moi choisir.
2. Mise en page `src/layouts/premium/`, composants dans `src/components/premium/` :
   GalerieEditoriale, PageChantier (une page par réalisation), FormulaireDevis (non relié
   en démo, signalé comme tel), Objet3D (`<model-viewer>`, chargé seulement si
   `objet3d.actif` est vrai, poster obligatoire).
3. Les pages : accueil, dépannage, installation, rénovation, réalisations, l'artisan, devis.
4. Compare les trois gammes côte à côte et vérifie que le Premium est nettement plus
   ambitieux sans perdre la rapidité ni le bouton Appeler.
5. Skill `controle-qualite`, Lighthouse ≥ 95, liste des images, commandes Git.
