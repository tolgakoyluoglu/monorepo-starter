# Fullstack Monorepo - NestJS + React

A fullstack TypeScript monorepo using pnpm workspaces, featuring a NestJS Fastify API backend with PostgreSQL and React frontend with Vite.

## Setup

### Prerequisites

- Node.js 18+
- pnpm 10+
- Docker & Docker Compose

### Installation

```bash
# Install dependencies for all workspaces
pnpm install

# Build the shared package
pnpm --filter @repo/shared build
```

### Database Setup

```bash
# Start PostgreSQL database
docker compose up -d

# Generate Drizzle client (run from apps/api directory)
cd apps/api
pnpm db:generate

# Create initial migration
pnpm db:migrate dev --name init
```

## Development

```bash
# Start all apps in parallel
pnpm dev

# Start specific app
pnpm --filter api dev
pnpm --filter client dev
```

## Docker Commands

```bash
# Start PostgreSQL in background
docker compose up -d

# Stop PostgreSQL
docker compose down

# Stop and remove volumes (deletes data)
docker compose down -v

# View logs
docker compose logs -f postgres
```

## TypeScript Path Aliases

All packages support the following path aliases:

- `@repo/shared` - Import from the shared package
- `@/*` - Import from the current package's src directory

## Configuration

### Environment Variables

Copy the example environment file and update as needed:

```bash
cp apps/api/.env.example apps/api/.env
```

#### Prettier

All packages use the root `.prettierrc` configuration automatically.

## Scripts

### Root Level

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm format` - Format all files with Prettier
- `pnpm clean` - Clean all node_modules and build artifacts
