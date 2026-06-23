# ft_transcendance

## Technical Stack

### Frontend

| Technology | Version | Role |
|---|---|---|
| React | 19 | UI framework |
| React Router DOM | 7 | Client-side routing |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | 4 | Utility-first styling |
| Sass | 1.99 | CSS preprocessor for custom styles |
| Styled Components | 6 | Component-scoped styles |
| React Konva | 19 | Canvas 2D drawing (weapon drawing phase) |
| Embla Carousel | 8 | Carousel UI component |
| react-use-websocket | 4 | WebSocket hook for real-time game events |
| @react-oauth/google | 0.13 | Google OAuth2 login |
| react-icons | 5 | Icon library |

**Justification:** React 19 was chosen for its mature ecosystem and component model. Vite provides near-instant HMR. Tailwind CSS enables rapid, consistent styling without writing custom CSS for every element. React Konva handles the interactive canvas drawing feature natively in React.

### Backend

| Technology | Version | Role |
|---|---|---|
| Node.js | — | Runtime |
| Express | 5 | HTTP server & routing |
| TypeScript | 5.8 | Type safety across the codebase |
| Socket.IO | 4 | Bidirectional real-time communication (game rooms, chat) |
| ws | 8 | Low-level WebSocket support |
| Drizzle ORM | 0.45 | Type-safe database access layer |
| Drizzle Zod | 0.8 | Auto-generated Zod schemas from Drizzle table definitions |
| Zod | 4 | Runtime input validation |
| bcrypt | 6 | Password hashing |
| jose | 6 | JWT creation and verification |
| otplib | 13 | TOTP generation for 2FA (Google Authenticator compatible) |
| qrcode | 1.5 | QR code generation for 2FA setup |
| multer | 2 | Multipart file upload (avatars) |
| helmet | 8 | HTTP security headers |
| morgan | 1 | HTTP request logging |
| cors | 2 | Cross-Origin Resource Sharing |
| cookie-parser | 1.4 | Cookie parsing middleware |

**Justification:** Express 5 was chosen for its minimalism and wide ecosystem. Drizzle ORM was preferred over Prisma for its lightweight footprint, SQL-like query builder, and first-class TypeScript inference without a separate codegen step. `jose` replaces `jsonwebtoken` because it is ESM-native and supports modern JWT standards. `otplib` + `qrcode` together provide a complete TOTP-based 2FA flow.

### Database

**PostgreSQL 16** (via Docker, Alpine image)

PostgreSQL was chosen for:
- Strong relational integrity with foreign keys and cascading deletes, which fits the relational nature of users, friendships, games, and messages.
- Native UUID support used as primary keys throughout.
- Enum types (`friendship_status`, `game_status`) enforced at the database level.
- Excellent performance and reliability for concurrent real-time game sessions.

**Drizzle Studio** is included in the Docker Compose stack for visual database inspection during development (port 4983).

### Other significant technologies

| Technology | Role |
|---|---|
| Docker / Docker Compose | Containerised local environment (PostgreSQL + Drizzle Studio) |
| Vitest | Unit and integration testing for the backend |

---

## Database Schema

### Tables and relationships

```
users
├── id          UUID  PK
├── email       VARCHAR(255) UNIQUE NOT NULL
├── username    VARCHAR(50)  UNIQUE NOT NULL
├── password    VARCHAR(255) NOT NULL          -- bcrypt hash
├── avatar      TEXT                           -- base64 or data URL
├── two_factor_enabled  BOOLEAN DEFAULT false
├── two_factor_secret   VARCHAR(255)           -- TOTP secret
├── created_at  TIMESTAMP
└── updated_at  TIMESTAMP

friendships
├── id          UUID  PK
├── user_id     UUID  FK → users.id  (CASCADE DELETE)
├── friend_id   UUID  FK → users.id  (CASCADE DELETE)
├── status      ENUM(pending | accepted | rejected)
└── created_at  TIMESTAMP

private_messages                               -- only between friends
├── id          UUID  PK
├── sender_id   UUID  FK → users.id  (CASCADE DELETE)
├── receiver_id UUID  FK → users.id  (CASCADE DELETE)
├── content     TEXT  NOT NULL
└── created_at  TIMESTAMP

games
├── id          UUID  PK
├── code        TEXT                           -- shareable room code
├── status      ENUM(waiting | drawing | in_progress | finished)
├── environment TEXT                           -- game map/environment
├── created_at  TIMESTAMP
└── finished_at TIMESTAMP

game_players                                   -- junction: users ↔ games
├── id          UUID  PK
├── game_id     UUID  FK → games.id  (CASCADE DELETE)
├── user_id     UUID  FK → users.id  (CASCADE DELETE)
├── score       INTEGER DEFAULT 0
├── is_winner   BOOLEAN
└── joined_at   TIMESTAMP

weapon_drawings                                -- one drawing per player per game
├── id              UUID  PK
├── game_id         UUID  FK → games.id  (CASCADE DELETE)
├── user_id         UUID  FK → users.id  (CASCADE DELETE)
├── drawing_data    TEXT  NOT NULL             -- base64 encoded canvas image
├── ai_guessed_weapon VARCHAR(100)             -- result of AI classification
└── submitted_at    TIMESTAMP

game_stories                                   -- AI-generated story, one per game
├── id           UUID  PK
├── game_id      UUID  FK → games.id  (CASCADE DELETE, UNIQUE)
├── story        TEXT  NOT NULL
├── winner_id    UUID  FK → users.id  (SET NULL on delete)
└── generated_at TIMESTAMP

game_messages                                  -- group chat, players only
├── id          UUID  PK
├── game_id     UUID  FK → games.id  (CASCADE DELETE)
├── sender_id   UUID  FK → users.id  (CASCADE DELETE)
├── content     TEXT  NOT NULL
└── created_at  TIMESTAMP
```

### Entity relationships

```
users ──< friendships >── users          (self-referencing M:N via junction)
users ──< private_messages >── users     (sender / receiver)
users ──< game_players >── games         (M:N junction with score & winner flag)
users ──< weapon_drawings >── games      (one per player per game)
games ──  game_stories                   (1:1 — unique FK on game_id)
games ──< game_messages >── users        (group chat scoped to a game)
```

### Enums

| Enum | Values |
|---|---|
| `friendship_status` | `pending`, `accepted`, `rejected` |
| `game_status` | `waiting`, `drawing`, `in_progress`, `finished` |
