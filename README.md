# Configuration du Blog

Ce template est configurable via le fichier `public/config.json`.

## Paramètres disponibles :

- **title** : Titre du blog
- **description** : Description sous le titre
- **logo** : Logo SVG personnalisable
- **colors** : Couleurs (fond, texte, accent)
- **fonts** : Police Google Fonts

## Exemple de configuration :

```json
{
  "blog": {
    "title": "Mon Blog Tech",
    "description": "Actualités et tutoriels sur la technologie",
    "logo": {
      "svg": "<svg>...</svg>",
      "alt": "Logo Tech"
    },
    "colors": {
      "background": "#f8fafc",
      "text": "#1e293b",
      "accent": "#3b82f6"
    },
    "fonts": {
      "googleFontsUrl": "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
    }
  }
}
```

## Comment modifier :

1. Éditez `public/config.json`
2. Sauvegardez
3. Rechargez la page
