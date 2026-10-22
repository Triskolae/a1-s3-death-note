# A1 - S3 - Death Note, le carnet des branches

Ouvrez `index.html` dans votre navigateur. Aucune dépendance ni installation n’est nécessaire.

Cliquez sur le carnet pour ouvrir ou fermer sa page. Le formulaire permet d’écrire des noms et des notes visibles sur le site. Le projet contient deux personnages au départ.

## Les fichiers

- `index.html` : structure et formulaire.
- `style.css` : apparence du fan site.
- `contenu.js` : titre et entrées du carnet, suivis dans Git.
- `app.js` : affichage, écriture, recherche et export.
- `assets/death-note-cover.png` : carnet et plume sur fond transparent, image créée pour cet atelier.

## Conserver ce que vous écrivez

Écrire dans le formulaire modifie la page de l’onglet ouvert. Le navigateur ne réécrit pas directement les fichiers du projet. Utilisez **Exporter le contenu** pour télécharger `contenu.js`, remplacez ensuite le fichier du même nom dans le projet et rechargez la page. Vous pouvez alors ajouter et commiter ce fichier.

Sans cette étape, un rechargement reprend le contenu du fichier fourni. Pour les conflits, comparez les versions du fichier suivi dans Git, pas les états de deux onglets.

Le dépôt Git est créé pendant l’atelier guidé. La base de départ ne contient ni `.git` ni corrigé.
