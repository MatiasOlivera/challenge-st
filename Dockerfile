# Use the Node LTS image
FROM node:22-alpine

# enable corepack and activate pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app/src

# copy package files first to leverage Docker cache
COPY ./src/package.json ./src/pnpm-lock.yaml* ./

# install deps at build time (use frozen lockfile if lock exists)
RUN pnpm install --frozen-lockfile

# copy source
COPY ./src ./

EXPOSE 3000

CMD ["pnpm", "dev"]