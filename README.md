# challenge-st

Phrases app - Next.js + TypeScript project.

## Quick collaborator start

### Checklist
- Clone the repo
- Run with Docker Compose
- Run tests

### Local (not recommended)

```bash
# from project root
pnpm install
pnpm dev

# run tests locally
pnpm test
```

### Docker Compose (recommended)

```bash
docker compose build
docker compose up
```

### Run tests

```bash
# run inside container
docker compose exec app sh
pnpm test
```
### App

Go to http://localhost:3000/ in a browser.

## Essentials
- The repo is a Next.js app using TypeScript (see `app/`, `tsconfig.json`).
- The package manager is pnpm.

## Main directory structure

```
├── coverage # Code coverage
├── docker-compose.yml # Docker compose
├── Dockerfile # Docker file
├── .gitignore # Ignore files in Git commits
├── README.md
├── src
│   ├── app
│   │   ├── components # Components
│   │   ├── layout.tsx # Main layout
│   │   ├── lib # Util functions
│   │   ├── page.tsx # Main page
│   │   ├── phrases # Phrases page
│   │   └── styles # CSS styles
│   ├── package.json
└── tmp # Temporal files from container
```

## Developer notes
- Tests use Jest. Coverage is available in `coverage/`.
- TypeScript types are enabled; keep changes type-safe.
- Keep Docker Compose as the canonical environment for CI parity.

## Contributing
- Fork + branch from `develop` for features/bugfixes.
- Open a pull request with a clear description and tests when applicable.

## Contact / issues
- Open an issue in this repository if something doesn't work or you need access.