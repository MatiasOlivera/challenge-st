# Use the latest LTS Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app/src

# Install pnpm globally
RUN corepack enable pnpm

# Copy package files and install dependencies
COPY ./src/package.json ./
RUN pnpm install

# Copy the rest of your app
COPY ./src .

# Expose port 3000 (Next.js default)
EXPOSE 3000

# Default command
CMD ["pnpm", "dev"] 