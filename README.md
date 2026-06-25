*This project has been created as part of the 42 curriculum by nsauret, pgiroux, pfranke, zmurie, lberne.*

# ft_transcendance

## Description

**ft_transcendance** is a full-stack, real-time multiplayer web application built as the capstone project of the 42 common core. At its heart, it is a browser-based party game in which players draw a weapon on a shared canvas, an AI model guesses what was drawn, and the game then generates a unique AI-narrated combat story that decides the round's winner — all synchronized live across every connected player.

Beyond the core game loop, the platform also provides a complete social layer (friends, private messaging, profiles) and a secure account system (JWT authentication, 2FA, Google OAuth2), making it a small but complete "social game platform" rather than just a single mini-game.

### Key features

- 🔐 Secure user accounts: registration/login, bcrypt password hashing, JWT sessions, TOTP-based Two-Factor Authentication, and Google OAuth2 login
- 👤 Profile system with avatar upload and public/own profile views
- 🤝 Friends system (requests, accept/reject, online status)
- 💬 Private messaging between friends, and in-game group chat
- 🎮 Real-time multiplayer game rooms over WebSockets, supporting remote players and 3+ players per game, with graceful reconnection handling
- ✏️ Canvas-based weapon drawing phase (React Konva)
- 🤖 AI weapon recognition from the player's drawing
- 📖 AI-generated combat narrative per game, deciding the round's outcome
- 🖱️ Custom in-game mouse/cursor component
- 🕹️ **flemme.ai** — a custom-built USB hardware controller (rotary-encoder "Etch A Sketch" style) that drives the drawing canvas directly, with an animated OLED face and a shake-to-clear gesture
- 🐳 Fully containerized development environment (Docker Compose)

---

## Instructions

### Prerequisites

- **Docker** and **Docker Compose** (used to run PostgreSQL and Drizzle Studio locally)
- **Node.js** (LTS recommended) and **npm**
- A `.env` file at the project root (see below) — environment variables are loaded via **dotenvx**
- (Optional, for OAuth2) A **Google Cloud** OAuth client ID/secret if you want to test Google login locally

> ⚠️ Note: confirm the exact variable names against the `.env.example` file at the repository root before running the project — the list below reflects the variables used by the stack as documented in this README.

### Environment variables (`.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string used by Drizzle ORM |
| `JWT_SECRET` / `JWT_REFRESH_SECRET` | Secrets used by `jose` to sign/verify access & refresh tokens |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Used by `@react-oauth/google` and the backend OAuth2 flow |
| `TOTP_ISSUER` | Display name used when generating 2FA QR codes via `otplib`/`qrcode` |
| `PORT` | Port on which the Express API listens |
| `VITE_API_URL` | Base URL the frontend (Vite dev server / proxy) uses to reach the backend |

### Installation & running the project

The project is designed to be launched with a single command from the project root:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ft_transcendance
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # then fill in the values described above
   ```

3. **Launch everything**
   ```bash
   make
   ```
   This single command builds and starts the full stack (database, backend, frontend) via Docker Compose, so no manual `npm install` or `docker compose up` is needed. Migrations run automatically as part of this process.

   > 🚧 The `make`-based launch is the target workflow for the project but is still being finalized — additional `make` targets (e.g. `make down`, `make clean`, `make re`) will be documented here once implemented.

4. **Open the app** at the printed URL (HTTPS, self-signed certificate — accept the browser warning) once the stack is up.

---

## Team Information

| Member | Role(s) | Responsibilities |
|---|---|---|
| **Nathan** | Product Owner (PO) & Developer | Defined the product vision and feature priorities; built the core game logic and the real-time WebSocket layer (game rooms, live synchronization, remote play, reconnection handling, support for 3+ players) |
| **Paul** | Project Manager (PM) & Developer | Coordinated planning and follow-up of the team's work; implemented the AI module (weapon recognition + AI-generated combat story via an LLM), the Google OAuth2 integration, and the Docker/Docker Compose infrastructure |
| **Zoé** | Tech Lead & Developer | Drove technical architecture decisions; designed and implemented the backend (Express/TypeScript), the database schema (PostgreSQL via Drizzle ORM), authentication (JWT, bcrypt, 2FA), the friends/chat system, and security hardening |
| **Pauline** | Developer (Frontend) | Implemented the majority of the frontend: React component architecture, routing, styling (Tailwind/Sass/Styled Components), and the canvas-based weapon drawing interface |
| **Lucas** | Developer | Worked on the front/back communication layer and built a custom in-game mouse/cursor component |

---

## Project Management

- **Organization:** the team held a weekly check-in meeting every Tuesday afternoon to review progress. Rather than a strict top-down task assignment, each member picked the part of the project they wanted to work on, based on their interests and strengths.
- **Project management tool:** GitHub (issues / project board) was used to track tasks and progress.
- **Communication channel:** Discord was used for day-to-day team communication.

---

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

---

## Features List

| Feature | Contributor(s) | Description |
|---|---|---|
| Registration & login (JWT, bcrypt) | Zoé | Account creation and session management using hashed passwords and signed JWTs |
| Google OAuth2 login | Paul | Remote authentication via Google account |
| Two-Factor Authentication (TOTP) | Zoé | QR-code based 2FA setup and verification, compatible with standard authenticator apps |
| Profile management & avatar upload | Zoé (backend) / Pauline (frontend) | Users can edit their information and upload an avatar (default avatar if none provided) |
| Friends system | Zoé | Send/accept/reject friend requests, view friends list and online status |
| Private messaging | Zoé (backend) / Pauline (frontend) | Direct messages between friends |
| In-game group chat | Zoé / Nathan | Chat scoped to a given game room |
| Real-time multiplayer game rooms | Nathan | WebSocket-based game rooms with live state synchronization |
| Remote play & reconnection handling | Nathan | Players on separate machines can play together, with graceful handling of disconnections |
| 3+ player support | Nathan | Game logic and synchronization extended beyond two players |
| Weapon drawing canvas | Pauline | Canvas-based drawing interface (React Konva) for the weapon drawing phase |
| AI weapon recognition | Paul | Classifies the player's drawing into a weapon type |
| AI-generated combat story | Paul | Generates a unique narrative per game that determines the round's winner |
| Custom mouse/cursor | Lucas | Custom in-game cursor component |
| **flemme.ai USB controller** | **Nathan** | **Physical Etch-A-Sketch-style USB HID controller (custom PCB + firmware) driving the drawing canvas, with an animated OLED face and shake-to-clear gesture detection — see [Custom Module](#custom-module-flemmeai--usb-etch-a-sketch-controller) below** |
| Containerized dev environment | Paul | Docker Compose stack for PostgreSQL and Drizzle Studio |

---

## Modules

| Module | Type | Points | Implemented by |
|---|---|---|---|
| Use a frontend framework (React) | Minor | 1 | Pauline |
| Use a backend framework (Express) | Minor | 1 | Zoé |
| Use an ORM for the database (Drizzle) | Minor | 1 | Zoé |
| Remote authentication with OAuth 2.0 (Google) | Minor | 1 | Paul |
| Complete 2FA system | Minor | 1 | Zoé |
| Image recognition and tagging system | Minor | 1 | Paul |
| Real-time features using WebSockets | Major | 2 | Nathan |
| User interaction (chat, profile, friends) | Major | 2 | Zoé |
| Standard user management and authentication | Major | 2 | Zoé |
| Complete LLM system interface | Major | 2 | Paul |
| Web-based multiplayer game | Major | 2 | Nathan |
| Remote players | Major | 2 | Nathan |
| Multiplayer game (more than two players) | Major | 2 | Nathan |
| **Custom module: flemme.ai — USB hardware drawing controller** | **Major** | **2** | **Lucas** |

**Total: 6 Minor modules + 8 Major modules = 6 + 16 = 22 points**

### Justification & implementation notes

- **Frontend/Backend frameworks & ORM** were chosen for the reasons detailed in the [Technical Stack](#technical-stack) section above (mature ecosystems, TypeScript-first tooling, minimal footprint).
- **OAuth2 + 2FA** together give users a flexible but secure authentication experience: OAuth2 for convenience, TOTP 2FA as an additional security layer for password-based accounts.
- **Real-time WebSockets, remote players & multiplayer (3+)** were implemented as a single coherent real-time layer (Socket.IO) so that game state, chat, and player presence all flow through the same synchronization mechanism, with reconnection logic to handle dropped connections gracefully.
- **LLM interface + image recognition** were implemented as a dedicated AI module: the drawing canvas output is sent for weapon classification, and the recognized weapon(s) are fed into an LLM prompt that streams back a generated combat story, with error handling and rate limiting around the AI calls.

### Custom module: flemme.ai — USB Etch-A-Sketch controller

**What it is:** a physical, plug-and-play USB controller — built from scratch (custom PCB, firmware, and 3D-printed enclosure) — that drives any mouse-based web drawing app, including the weapon-drawing phase of ft_transcendance. It presents itself to the OS as a standard USB HID mouse (no driver, no companion app), uses two rotary encoders for X/Y cursor movement and a toggle switch for pen up/down, includes an MPU-6050 accelerometer to detect a "shake to clear" gesture, and displays an animated reactive face on a small OLED screen. Full hardware documentation, wiring, schematics, and firmware are in [`README.controller.md`](./README.controller.md).

**Why we chose this module**
We wanted one module that pushed the project outside the boundaries of "another web app" and demonstrated engineering breadth beyond software. Since the gameplay already revolves around drawing, a physical drawing controller plugs directly into the existing core loop instead of being a disconnected gimmick — it's a hardware extension of a feature the project already needs.

**Technical challenges it addresses**
- Implementing a native **USB HID mouse device** on an ATmega32U4 (Pro Micro) — relative cursor movement and click state with zero drivers or installation, working in any browser-based drawing tool out of the box.
- Reading **two quadrature rotary encoders** concurrently and converting raw rotation into smooth, accurate relative mouse deltas without missed steps or drift.
- Sharing a **single I2C bus** between two peripherals at different addresses (SSD1306 OLED at `0x3C`, MPU-6050 at `0x68`) while keeping a ~30 fps display refresh and a 100 Hz accelerometer poll running concurrently on a single-threaded MCU.
- Designing a **gesture-recognition algorithm** from raw accelerometer samples — counting direction reversals above a ~0.5 g threshold over a 1.5 s window — to reliably detect a deliberate shake (vs. normal handling) and translate it into a `Ctrl+A → Delete` HID keyboard sequence, with a cooldown to avoid repeated triggers.
- Driving **real-time reactive graphics** on a constrained OLED: a smoothed velocity vector derived from cursor movement drives pupil position and decays back to center when idle, on top of randomized blinking and a separate animated "dizzy" state.
- **End-to-end hardware fabrication**: schematic capture and PCB layout in KiCad, 3D-modeling and printing the enclosure, and the complete electrical wiring between the MCU, encoders, switch, OLED, and IMU.

**How it adds value to the project**
It gives players an alternative, tactile, more playful input method for the drawing phase — the most distinctive moment of the game — without requiring any setup on the player's machine. It also turns ft_transcendance into more than a pure web app: a working hardware/software co-design, which is a meaningful differentiator for a portfolio/demo context.

**Why it deserves Major module status**
The module spans four distinct technical domains — embedded firmware (C/C++ on AVR, USB HID stack), electronics design (custom PCB), mechanical design (3D-printed enclosure), and signal processing (gesture detection + animation from sensor data) — each independently non-trivial, and all integrated into a single working physical product built and soldered from scratch. This breadth and depth of work is comparable to the other Major modules already listed (e.g. the real-time multiplayer engine or the LLM integration), well beyond what a Minor module or a "trivial feature" would represent.

---

## Individual Contributions

**Zoé — Tech Lead, Backend & Database**
Designed and implemented the entire backend: Express/TypeScript API structure, the PostgreSQL schema and migrations via Drizzle ORM, JWT-based authentication with bcrypt password hashing, the TOTP 2FA flow (`otplib` + `qrcode`), avatar uploads (`multer`), and the friends/private-messaging system.

**Nathan — Product Owner, Game Logic & Real-Time Layer**
Defined the product direction and built the core multiplayer game engine: real-time game rooms, state synchronization, support for remote players and for more than two players simultaneously, and reconnection handling on disconnect. He also designed.

**Paul — Project Manager, AI Module, OAuth2 & Infrastructure**
Coordinated the team's planning, and implemented the AI side of the project (weapon recognition from drawings and LLM-based combat story generation, including streaming and error handling), the Google OAuth2 login flow, and the Docker/Docker Compose setup used for local development.

**Pauline — Frontend**
Built the majority of the frontend application: component architecture, routing, styling, and the canvas-based weapon drawing interface.

**Lucas — Custom Mouse**
Built **flemme.ai**, the project's custom hardware module: a USB Etch-A-Sketch-style controller (custom PCB designed in KiCad, 3D-printed enclosure, and C/C++ firmware on an ATmega32U4) that drives the drawing canvas as a plug-and-play USB HID mouse, complete with an animated reactive OLED face and accelerometer-based "shake to clear" gesture — built and soldered at 42Paris's LabElec with support from the 42Chips association.


---

## Resources

### Documentation & tutorials

- [Express.js official documentation](https://expressjs.com/)
- [Socket.IO documentation](https://socket.io/docs/)
- [Drizzle ORM documentation](https://orm.drizzle.team/)
- [PostgreSQL official documentation](https://www.postgresql.org/docs/)
- [MDN — WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [jose (JWT library) documentation](https://github.com/panva/jose)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Frontend Masters — API Design in Node.js, v5](https://frontendmasters.com/courses/api-design-nodejs-v5/) — this course was a major help in designing the backend's API architecture
- [Best practices of using WebSockets for real-time communication (Medium)](https://medium.com/@tusharkumardev/best-practices-of-using-websockets-real-time-communication-in-react-native-projects-89e749ba2e3f) — used as a reference for the real-time/WebSocket implementation
- [Arduino official documentation](https://docs.arduino.cc) — main reference for the `flemme.ai` USB controller firmware (Pro Micro / ATmega32U4, USB HID)
- [Arduino forum](https://forum.arduino.cc) and related community forums — used throughout the hardware module for wiring, encoder handling, and I2C troubleshooting
- **LabElec of 42Paris** and the **42Chips** student association — primary source of hardware knowledge, tools, and fabrication support (PCB design/etching, 3D printing) for the `flemme.ai` controller

### AI usage

Claude (Anthropic's AI assistant) was used throughout backend development as a learning and debugging aid, in particular for: resolving Drizzle ORM migration and version-compatibility issues, debugging an Express routing conflict, troubleshooting Docker/Podman configuration. StackOverflow was also used as a complementary resource for debugging across the project. For the `flemme.ai` hardware module, Claude was additionally used to help debug both the firmware/electronics side and the software integration, as well as to help write part of the module's documentation.