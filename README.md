# challenge-st

Phrases app - Next.js + TypeScript project.

## Quick Start

### Docker Compose (recommended)

```bash
# root directory
docker compose up --build

# run test script inside the container
docker compose exec app sh
pnpm test
```

App runs at http://localhost:3000

Code coverage at `/coverage/lcov-report/index.html`

### Local (not recommended)

```bash
node -v # v22.18.0 or higher
pnpm -v # 10.15.0 or higher

cd ./src
pnpm install
pnpm dev

# run tests with code coverage
pnpm test
```
App runs at http://localhost:3000

Code coverage at `src/coverage/lcov-report/index.html`

## Essentials
- The repo is a Next.js app using TypeScript (see `app/`, `tsconfig.json`).
- The package manager is pnpm.

## Structure

```
src/app/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── phrases/        # Phrases feature
│   ├── components/ # Feature components
│   ├── hooks/      # Feature hooks
│   ├── services/   # APIs
│   ├── store/      # State management
│   └── types/      # TypeScript types
└── styles/         # Global styles
```

## Development

- **Testing**: Jest with coverage in `coverage/` or `src/coverage/`
- **Types**: TypeScript strict mode enabled
- **Environment**: Docker Compose for CI parity
