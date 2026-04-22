# Project Contract Baseline

Version: 1.0

How to use :
1. Read before starting a module
2. While coding, keep your endpoints/events/env vars aligned with these rules
3. Before asking for integration, confirm compliance in the handoff file
4. If you must break a rule, use a temporary exception (section 9)


## 1) Purpose

This file defines the minimum communication rules between all modules.
If a module does not follow this baseline, integration is NO-GO until fixed or approved as an exception.

Think of this as the "common language" between backend, frontend, and realtime code.


## 2) Change Policy

- Any change to this contract requires team approval before merge

- Breaking changes require:
  - explicit notice in PR description
  - migration path
  - updates in module handoff file
  - coordinated merge window

- Versioning:
  - patch: typo or clarification only
  - minor: backward-compatible additions
  - major: breaking changes


## 3) API Baseline

API (Application Programming Interface) means how one part of the app asks another part for data 
or actions.
These rules ensure every endpoint looks predictable.

### 3.1 Route style

- Base prefix: /api/v1
- Use plural resources where possible:
  - /api/v1/users
  - /api/v1/games
- Use nouns for paths and HTTP methods for intent:
  - GET: read
  - POST: create
  - PUT/PATCH: update
  - DELETE: remove

Example:
- GET /api/v1/users
- POST /api/v1/games

### 3.2 Request format

- Content-Type for JSON endpoints: application/json
- Validation is mandatory in backend for body, params, and query.
- Unknown fields should be rejected or ignored consistently.

### 3.3 Success response shape

All success responses should follow:

{
  "ok": true,
  "data": {},
  "meta": {
    "requestId": "optional-id",
    "timestamp": "2026-04-22T12:00:00Z"
  }
}

Notes:
- data can be object, array, or null.
- meta is recommended and required for paginated endpoints.

### 3.4 Error response shape

All error responses should follow:

{
  "ok": false,
  "error": {
    "code": "MACHINE_READABLE_CODE",
    "message": "Human readable message",
    "details": {}
  },
  "meta": {
    "requestId": "optional-id",
    "timestamp": "2026-04-22T12:00:00Z"
  }
}

Minimum status code rules:
- 400: validation/bad request
- 401: not authenticated
- 403: authenticated but forbidden
- 404: resource not found
- 409: conflict
- 422: semantically invalid payload
- 500: unexpected server error


## 4) Authentication Baseline

- Auth scheme: Bearer token in Authorization header.
- Header format: Authorization: Bearer <token>
- Protected endpoints must fail with 401 if token missing/invalid.
- Public endpoints must be explicitly documented.
- No hardcoded production secrets.

Notes:
- "Protected" means login is required
- "Public" means anyone can call it and should be clearly listed


## 5) Realtime Baseline

Notes:
- Realtime is for instant updates (websocket/socket.io events).
- Use consistent event names and payload shape so clients do not break.

### 5.1 Event naming

- Event names use lowercase, dot-separated domain format:
  - game.round.started
  - drawing.stroke.updated
  - user.status.changed

Notes:
- Prefer domain.action.state format, not random short names.

### 5.2 Event envelope

Realtime payload should follow:

{
  "type": "drawing.stroke.updated",
  "version": "1.0",
  "payload": {},
  "meta": {
    "timestamp": "2026-04-22T12:00:00Z",
    "requestId": "optional-id"
  }
}

### 5.3 Reconnect behavior

- On reconnect, client must receive enough state to resync.
- Duplicate events should be tolerated without corrupting state.
- Reconnect strategy must be tested and reported in handoff.

Example:
- If a player reconnects mid-game, server sends current game state snapshot


## 6) Database and Migration Baseline

- Any schema change must include a migration file.
- Migration naming format: YYYYMMDDHHMM_description
- Migration must be tested from empty database.
- Rollback or mitigation plan must be documented in handoff.

Notes:
- Never change schema manually on one machine only.


## 7) Environment Baseline

Required baseline variables (adapt per service):
- APP_ENV
- PORT
- DATABASE_URL
- JWT_SECRET
- FRONTEND_URL
- API_BASE_URL

Rules:
- Every new required variable must be added to .env.example
- Secrets must never be committed.

Notes:
- .env.example is committed to document required environment variable keys, while real secret values are stored only in local .env files and must never be committed.
- Copy it to .env locally and fill real values on your machine


## 8) Integration Gate

A module is integration-ready only if:
- it follows sections 3, 4, 5, 6, and 7
- it provides evidence in handoff

If not, status is NO-GO.

Notes:
- GO means safe to merge into integration branch.
- NO-GO means fix contract issues first.


## 9) Temporary Exceptions

Please if there must be exceptions provide:
- written reason
- aproximate expiry date
- follow-up task to return to baseline


## 10) Quick Glossary

- Contract: agreed technical rules that all modules follow.
- Endpoint: backend URL + method (example: GET /api/v1/users).
- Payload: the data sent in request/response/event.
- Schema: expected structure and types of data.
- Migration: versioned database change script.
