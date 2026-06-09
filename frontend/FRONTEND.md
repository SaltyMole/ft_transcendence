# Guide Frontend — Transcendance

Doc à destination du front. Pour la référence complète des routes, voir [api/API.md](api/API.md).

---

## Lancer l'API en local

```bash
# 1. Démarrer la base de données
docker compose up -d postgres

# 2. Lancer l'API
cd api
cp .env.example .env   # à adapter si besoin
npm install
npm run dev
```

L'API tourne sur `http://localhost:3000`.  
Drizzle Studio (visualiseur BDD) : `http://localhost:4983` (via `docker compose up -d drizzle-studio`).

---

## Base URL

```
http://localhost:3000/api
```

---

## Authentification

### Principe

L'API utilise un cookie `httpOnly` nommé `token`. Le serveur le pose automatiquement lors du `register` et du `login` — **aucun header `Authorization` à gérer manuellement**. Le navigateur l'envoie automatiquement à chaque requête vers la même origine.

Pour que les cookies fonctionnent en cross-origin (ex. front sur `localhost:5173`, API sur `localhost:3000`), il faut **`credentials: 'include'`** dans chaque fetch.

Le token expire au bout de **7 jours**.

### Erreurs d'auth

| Code | Signification                          |
|------|----------------------------------------|
| 401  | Cookie absent → rediriger vers /login  |
| 403  | Cookie invalide ou expiré → déconnecter|

---

## Wrapper fetch recommandé

```ts
const BASE_URL = 'http://localhost:3000/api'

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include', // envoie le cookie token automatiquement
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error ?? `HTTP ${res.status}`)
  }

  return res.json() as Promise<T>
}

// Exemples
const { user } = await apiFetch<{ user: User }>('/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
})
// Le cookie est posé automatiquement par le serveur, rien à stocker

const { user } = await apiFetch<{ user: User }>('/users/profile')
```

---

## Format des erreurs

Toutes les erreurs ont la même forme :

```json
{ "error": "Message lisible" }
```

Les erreurs de validation renvoient en plus un tableau `details` :

```json
{
  "error": "Validation failed",
  "details": [{ "field": "email", "message": "Invalid email format" }]
}
```

---

## Types TypeScript utiles

```ts
type User = {
  id: string
  email: string
  username: string
  avatar: string | null   // data URL base64 ou null
  createdAt: string       // ISO 8601
  updatedAt: string
}

type Friendship = {
  friendshipId: string
  since: string
  id: string             // id de l'ami
  username: string
  avatar: string | null
}

type FriendRequest = {
  friendshipId: string
  createdAt: string
  from: { id: string; username: string; avatar: string | null }
}

type UserStats = {
  gamesPlayed: number
  wins: number
  losses: number
  winRate: number        // 0–100
  totalScore: number
  averageScore: number
  friendCount: number
}

type Game = {
  id: string
  status: 'waiting' | 'in_progress' | 'finished'
  createdAt: string
  finishedAt: string | null
}

type GamePlayer = {
  userId: string
  username: string
  avatar: string | null
  score: number
  joinedAt: string
}

type Message = {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
}

type GameMessage = {
  id: string
  content: string
  createdAt: string
  sender: { id: string; username: string; avatar: string | null }
}
```

---

## Flux par feature

### Connexion / inscription

```
POST /auth/register  →  { user }           + cookie token (7j)
POST /auth/login     →  { user }           + cookie token (7j)
                     →  { requiresTwoFactor: true }  (si 2FA activé) + cookie tempToken (5min)
POST /auth/logout    →  { message }        supprime le cookie token
```

Le cookie est géré automatiquement par le navigateur — aucun stockage manuel nécessaire.

---

### Authentification à deux facteurs (2FA)

| Étape | Appel API |
|-------|-----------|
| **Setup** | `POST /auth/2fa/setup` → reçoit `{ qrCode, secret, otpauthUrl }` → afficher le QR |
| **Activer** | `POST /auth/2fa/enable` `{ code }` → confirme avec le code de l'appli (Google Authenticator, etc.) |
| **Login normal** | `POST /auth/login` → si `requiresTwoFactor: true` → afficher input TOTP |
| **Login 2FA** | `POST /auth/2fa/verify-login` `{ code }` → reçoit `{ user }` + cookie token final |
| **Désactiver** | `POST /auth/2fa/disable` `{ code }` → vérifie puis supprime le secret |

**Flux d'activation :**
1. Appeler `POST /auth/2fa/setup` (cookie token requis) → afficher `qrCode` (data URL) dans une `<img>`
2. L'utilisateur scanne avec son appli TOTP
3. L'utilisateur saisit le code à 6 chiffres → `POST /auth/2fa/enable { code }`

**Flux de connexion avec 2FA :**
1. `POST /auth/login` retourne `{ requiresTwoFactor: true }` et pose un cookie `tempToken` (5 min)
2. Afficher un input pour le code TOTP
3. `POST /auth/2fa/verify-login { code }` — le `tempToken` est lu depuis le cookie automatiquement
4. Le serveur pose le cookie `token` final et retourne `{ user }` → connexion terminée

---

### Profil

```
GET  /users/profile           →  { user }
PUT  /users/profile           →  { message, user }   (champs optionnels)
PUT  /users/avatar            →  { message, user }   (body: { avatar: "data:image/png;base64,..." })
PUT  /users/password          →  { message }
GET  /users/stats             →  { stats }
```

**Avatar** : convertir le fichier en base64 avant d'envoyer.

```ts
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const avatar = await fileToBase64(inputFile)
await apiFetch('/users/avatar', { method: 'PUT', body: JSON.stringify({ avatar }) })
```

Pour afficher l'avatar : `<img src={user.avatar} />` directement (c'est une data URL).

---

### Amis

```
GET    /friends                         →  { friends: Friendship[] }
GET    /friends/requests                →  { requests: FriendRequest[] }
POST   /friends/request                 →  { friendship }   (body: { friendId })
PUT    /friends/:friendshipId/respond   →  { friendship }   (body: { status: "accepted"|"rejected" })
DELETE /friends/:friendshipId          →  { message }
```

Flux typique :
1. Trouver l'`id` de l'utilisateur cible (via son profil, une liste, etc.)
2. `POST /friends/request` avec son `id` → amitié en `pending`
3. L'autre accepte via `PUT /friends/:id/respond` avec `status: "accepted"`

---

### Messages privés

```
POST /messages                →  { message }   (body: { receiverId, content })
GET  /messages/:friendId      →  { messages: Message[] }
```

Les messages ne sont possibles qu'**entre amis** (status `accepted`). L'API renvoie `403` sinon.

---

### Parties

```
GET  /games                        →  { games }            (parties en attente)
POST /games                        →  { game }             (créer une partie)
GET  /games/:gameId                →  { game, players }    (détail + joueurs)
POST /games/:gameId/join           →  { message }          (rejoindre)
PUT  /games/:gameId/status         →  { game }             (body: { status: "in_progress"|"finished" })
PUT  /games/:gameId/score          →  { player }           (body: { score: number })
POST /games/:gameId/messages       →  { message }          (chat in-game)
GET  /games/:gameId/messages       →  { messages }         (chat in-game)
```

Statuts d'une partie :

```
waiting  →  in_progress  →  finished
```

Seuls les joueurs de la partie peuvent poster/lire les messages du chat.

---

## Récap des codes HTTP

| Code | Signification                        |
|------|--------------------------------------|
| 200  | OK                                   |
| 201  | Ressource créée                      |
| 400  | Données invalides / règle métier     |
| 401  | Token manquant                       |
| 403  | Token invalide / accès refusé        |
| 404  | Ressource introuvable                |
| 500  | Erreur serveur (signaler au back)    |
