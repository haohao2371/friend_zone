# friend_zone

A lightweight NestJS backend that exposes in-memory CRUD APIs for four modules:

- `friends`
- `zones`
- `flags`
- `relationship`

It also includes a simple health check route.

## What was generated

This project was scaffolded with the latest NestJS CLI and then extended with:

- CRUD controllers and services for the four modules
- sample entity shapes and seeded sample records for each module
- a root overview route at `/`
- a health check route at `/health`
- Jest unit and e2e coverage for the generated API

## How it works

The app does not use a database yet. Each module stores its data in an in-memory array inside its service:

- `FriendsService`
- `ZonesService`
- `FlagsService`
- `RelationshipService`

Each service starts with one sample record and supports:

- `POST /<module>` create a record
- `GET /<module>` list all records
- `GET /<module>/:id` fetch one record
- `PATCH /<module>/:id` update a record
- `DELETE /<module>/:id` remove a record

## API routes

| Route | Description |
| --- | --- |
| `GET /` | API overview |
| `GET /health` | health check |
| `GET/POST/PATCH/DELETE /friends` | manage friend records |
| `GET/POST/PATCH/DELETE /zones` | manage zone records |
| `GET/POST/PATCH/DELETE /flags` | manage flag records |
| `GET/POST/PATCH/DELETE /relationship` | manage relationship records |

## Getting started

```bash
npm install
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## Useful commands

```bash
npm run build
npm run lint
npm run test
npm run test:e2e
```
