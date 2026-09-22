# Clash Royale Guide Hub

A Clash Royale fan site with these pages:

- Decks
- Strategies
- Synergies
- Glossary
- Coaching
- Trophy progress

## Run locally

```bash
pnpm install
pnpm run dev
pnpm run build
```

The site is built from the `app/` directory. `pnpm run build:pages` creates the static GitHub Pages site in `dist/client`.

## Deploy to GitHub Pages

The included GitHub Actions workflow deploys automatically whenever `main` is updated. In the repository settings, set Pages → Build and deployment → Source to **GitHub Actions**. The workflow automatically applies the repository name as the project-site base path.
