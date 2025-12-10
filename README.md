# rah-th-sight (Next.js)

This is a Next.js 13 frontend for the RAH-TH project. It consumes the Authentication and Database microservices and is intended to run within docker-compose alongside the backend services and MongoDB.

## Prerequisites

- Node.js 18+
- npm or yarn
- The following services (locally or via docker-compose):
  - rts-authentication-server (Spring Boot)
  - rts-database-microservice (FastAPI)
  - MongoDB

## Environment Variables

Create `.env.local` with values appropriate for your environment. Example:

```
NEXT_PUBLIC_API_BASE=http://localhost:8000
NEXT_PUBLIC_AUTH_BASE=http://localhost:8080
```

If using a reverse proxy (Traefik/Nginx) in docker-compose, point these to the routed hostnames instead of raw ports.

## Scripts

- `npm run dev` — Start Next.js dev server on 0.0.0.0 (port defined by Next, defaults to 3000)
- `npm run build` — Build for production
- `npm start` — Start production build
- `npm run lint` — Lint
- `npm run prettier` — Format

## Docker/Compose

This service is referenced by `rah-th-server/docker-compose.yml` as `rah-th-sight-ms` and typically exposed on port 3000. Use compose to run the full stack so the frontend can reach backend services on the same network.
