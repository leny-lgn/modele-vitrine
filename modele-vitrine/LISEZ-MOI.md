# Kit « modèles de sites vitrines » — v2 (trois gammes par secteur)

## Ce que contient le kit
| Fichier | Rôle |
|---|---|
| `CLAUDE.md` | Règles du projet, lues automatiquement par Claude Code |
| `.claude/settings.json` | Commandes autorisées ; `git push` interdit à l'assistant |
| Skills externes (à installer) | Impeccable (design), Emil Kowalski (animations, optionnel) |
| `.claude/skills/nouveau-secteur/` | Ajouter un secteur : brief, thème, 3 sites |
| `.claude/skills/adapter-enseigne/` | Adapter un modèle à un vrai commerce |
| `.claude/skills/controle-qualite/` | Relecture exigeante avant de montrer un site |
| `.mcp.json` | Connexions Playwright (captures) et Blender (3D), propres au projet |
| `docs/briefs/plombier.md` | Direction artistique du plombier et de ses 3 gammes |
| `docs/images/plombier-style.txt` | Bloc de style ajouté à chaque prompt d'image |
| `src/sites/plombier-*.json` | Les 3 sites plombier (images et prompts compris) |
| `wrangler.jsonc` | Déploiement Cloudflare Workers |
| `prompts/00` à `05` | Les prompts à donner à Claude Code, dans l'ordre |

## 1. Installer les outils (une fois)
```bash
# Homebrew, si absent
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install node git gh uv
brew install --cask blender visual-studio-code
gh auth login

# Claude Code (installateur natif)
curl -fsSL https://claude.ai/install.sh | bash
claude --version
```

## 2. Créer le projet et poser le kit
```bash
mkdir -p ~/Documents/sites && cd ~/Documents/sites
npm create astro@latest modele-vitrine     # minimal, TypeScript strict, Git oui
cd modele-vitrine
npm install -D wrangler
```
Copie tout le contenu du kit dans `modele-vitrine/`, fichiers cachés compris
(`.claude`, `.mcp.json` : Cmd+Maj+. dans le Finder pour les voir). Puis :
```bash
git add . && git commit -m "Kit v2 : trois gammes par secteur"
gh repo create modele-vitrine --private --source=. --push
```

## 3. Mettre en ligne (une fois)
Cloudflare → Workers & Pages → Créer → importer le dépôt `modele-vitrine`.
Build : `npm run build` · Deploy : `npx wrangler deploy`.
Ensuite, chaque `git push` remet tout en ligne.

## 4. Préparer Claude Code (une fois)
```bash
cd ~/Documents/sites/modele-vitrine
claude
```
- À la première ouverture : connecte-toi, puis accepte les serveurs MCP du projet
  (`.mcp.json`) quand il te le demande.
- Installe les skills de design (dans un terminal, depuis le dossier du projet) :
  ```bash
  npx skills add pbakaus/impeccable          # base design : règles, /impeccable critique, audit, polish
  npx skills add emilkowalski/skill          # optionnel : qualité des animations
  ```
  L'installateur te demande pour quel agent : choisis Claude Code.
  Alternative pour Impeccable : dans Claude Code, `/plugin marketplace add pbakaus/impeccable`, puis `/plugin`.
  N'installe pas frontend-design en plus : Impeccable en est dérivé, ils feraient doublon.
  Redémarre Claude Code, puis vérifie avec `/skills` qu'ils apparaissent.
- Tes skills maison (`.claude/skills/`) et `CLAUDE.md` sont détectés automatiquement.
- Vérifie avec `/mcp` que `playwright` est connecté. S'il manque un navigateur :
  `npx playwright install chromium`.

### Blender (optionnel, pour la 3D du Premium)
```bash
uvx mcp-for-blender install-addon
```
Dans Blender : Édition → Préférences → Add-ons → active « Interface: MCP for Blender ».
Dans la vue 3D, touche N → onglet MCP for Blender → « Start MCP Server » si besoin.
Blender doit être ouvert avec le serveur démarré pour que Claude Code le voie.
Attention : cet outil exécute du code Python dans Blender. Sauvegarde ta scène avant,
et lis ce qu'il propose d'exécuter avant d'accepter.

## 5. Construire, dans l'ordre
Toujours depuis `~/Documents/sites/modele-vitrine`, un prompt à la fois, en mode plan
(Shift+Tab) pour les étapes de design :

1. `prompts/00-fondations.md` — base commune, menu Modèles, cadres d'images
2. `prompts/01-plombier-essentiel.md`
3. `prompts/02-plombier-vitrine.md`
4. `prompts/03-plombier-premium.md`
5. `prompts/04-objet-3d-blender.md` (optionnel)
6. `prompts/05-nouveau-secteur.md` pour chaque secteur suivant

Après chaque étape : `npm run dev`, regarde sur ton ordinateur et ton téléphone,
puis publie toi-même :
```bash
git add . && git commit -m "Plombier vitrine" && git push
```
Astuce : `/clear` entre deux grosses étapes pour repartir d'un contexte propre.

## 6. Les images avec Nano Banana Pro
1. `npm run images` liste toutes les images manquantes : chemin, format, prompt complet.
   Sur le site en démo, chaque image manquante apparaît comme un cadre avec les mêmes
   informations et un bouton « Copier ».
2. Colle le prompt dans Nano Banana Pro, au bon format.
3. Exporte en WebP (ou demande à Claude Code un script de conversion) et dépose le fichier
   exactement au chemin indiqué. Le cadre est remplacé par l'image.
4. Pour un vrai client : ses vraies photos remplacent les images générées.

## 7. Adresses en ligne
- `/` : grille de tous les modèles
- `/plombier-essentiel`, `/plombier-vitrine`, `/plombier-premium`
- Le menu « Modèles » en bas de chaque démo relie tous les sites entre eux.
