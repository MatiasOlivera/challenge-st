# challenge-st
Phrases app

## How to run

With Docker Compose (Recommended)

Build the Docker Images
```bash
docker compose build
```

Run the Docker Containers
```bash
docker compose up
```

Run automated testing

```bash
docker compose exec app sh
pnpm test
```

With Docker

Build the Docker Image
```bash
docker build -t challenge-st .
```

Run the Docker Container
```bash
docker run -p 3000:3000 challenge-st
```
