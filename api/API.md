# API Documentation — Transcendance

## Base URL

```
http://localhost:3000/api
```

---

## Authentification

La plupart des routes sont protégées par un JWT.  
Ajoute le token dans le header de chaque requête :

```
Authorization: Bearer <token>
```

Le token est retourné lors du `register` et du `login`. Il expire selon la valeur de `JWT_EXPIRES_IN` (défaut : `7d`).

---

## Format des erreurs

Toutes les erreurs suivent le même format :

```json
{
  "error": "Message d'erreur"
}
```

Les erreurs de validation retournent un tableau `details` :

```json
{
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

---

## Health

### GET `/health`

Vérifie que le serveur est opérationnel. Ne requiert pas de token.

**Réponse** `200`

```json
{
  "status": "OK",
  "timestamp": "2026-05-17T10:00:00.000Z",
  "service": "Transcendance API"
}
```

---

## Auth

### POST `/auth/register`

Crée un nouveau compte.

**Body**

| Champ       | Type   | Requis | Contraintes              |
|-------------|--------|--------|--------------------------|
| email       | string | oui    | format email valide      |
| username    | string | oui    | 3–50 caractères          |
| password    | string | oui    | min. 8 caractères        |
| firstName   | string | non    |                          |
| lastName    | string | non    |                          |

**Réponse** `201`

```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "pauline@example.com",
    "username": "pauline",
    "firstName": "Pauline",
    "lastName": "Giroux",
    "createdAt": "2026-05-16T10:00:00.000Z"
  },
  "token": "<jwt>"
}
```

---

### POST `/auth/login`

Connecte un utilisateur existant.

**Body**

| Champ    | Type   | Requis |
|----------|--------|--------|
| email    | string | oui    |
| password | string | oui    |

**Réponse** `200`

```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "pauline@example.com",
    "username": "pauline",
    "firstName": "Pauline",
    "lastName": "Giroux"
  },
  "token": "<jwt>"
}
```

**Erreurs**

| Code | Description               |
|------|---------------------------|
| 401  | Identifiants incorrects   |

---

## Users

> Toutes les routes `/users` requièrent un token JWT.

### GET `/users/profile`

Retourne le profil de l'utilisateur connecté.

**Réponse** `200`

```json
{
  "user": {
    "id": "uuid",
    "email": "pauline@example.com",
    "username": "pauline",
    "firstName": "Pauline",
    "lastName": "Giroux",
    "createdAt": "2026-05-16T10:00:00.000Z",
    "updatedAt": "2026-05-16T10:00:00.000Z"
  }
}
```

---

### PUT `/users/profile`

Met à jour le profil de l'utilisateur connecté. Tous les champs sont optionnels.

**Body**

| Champ     | Type   | Contraintes     |
|-----------|--------|-----------------|
| email     | string | format email    |
| username  | string | 3–50 caractères |
| firstName | string | max 50 car.     |
| lastName  | string | max 50 car.     |

**Réponse** `200`

```json
{
  "message": "Profile updated successfully",
  "user": { "id": "uuid", "email": "...", "username": "...", "updatedAt": "..." }
}
```

---

### PUT `/users/avatar`

Upload ou remplace l'avatar de l'utilisateur.  
L'avatar est stocké en base de données sous forme de chaîne (base64 ou data URL).

**Body**

| Champ  | Type   | Requis | Description                              |
|--------|--------|--------|------------------------------------------|
| avatar | string | oui    | Image encodée en base64 ou data URL      |

**Exemple**

```json
{
  "avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Réponse** `200`

```json
{
  "message": "Avatar updated successfully",
  "user": { "id": "uuid", "avatar": "data:image/png;base64,..." }
}
```

---

### PUT `/users/password`

Change le mot de passe de l'utilisateur connecté.

**Body**

| Champ           | Type   | Requis | Contraintes       |
|-----------------|--------|--------|-------------------|
| currentPassword | string | oui    |                   |
| newPassword     | string | oui    | min. 8 caractères |

**Réponse** `200`

```json
{ "message": "Password changed successfully" }
```

**Erreurs**

| Code | Description                      |
|------|----------------------------------|
| 400  | Mot de passe actuel incorrect    |

---

## Friends

> Toutes les routes `/friends` requièrent un token JWT.

### GET `/friends`

Retourne la liste des amis acceptés de l'utilisateur connecté.

**Réponse** `200`

```json
{
  "friends": [
    {
      "friendshipId": "uuid",
      "since": "2026-05-16T10:00:00.000Z",
      "id": "uuid",
      "username": "paul",
      "firstName": "Paul",
      "lastName": "Franke",
      "avatar": null
    }
  ]
}
```

---

### GET `/friends/requests`

Retourne les demandes d'amis reçues en attente.

**Réponse** `200`

```json
{
  "requests": [
    {
      "friendshipId": "uuid",
      "createdAt": "2026-05-16T10:00:00.000Z",
      "from": {
        "id": "uuid",
        "username": "lucas",
        "avatar": null
      }
    }
  ]
}
```

---

### POST `/friends/request`

Envoie une demande d'ami.

**Body**

| Champ    | Type (UUID) | Requis |
|----------|-------------|--------|
| friendId | string      | oui    |

**Réponse** `201`

```json
{
  "friendship": {
    "id": "uuid",
    "userId": "uuid",
    "friendId": "uuid",
    "status": "pending",
    "createdAt": "2026-05-16T10:00:00.000Z"
  }
}
```

**Erreurs**

| Code | Description                                    |
|------|------------------------------------------------|
| 400  | Demande envoyée à soi-même                     |
| 400  | Une relation existe déjà entre ces deux users  |
| 404  | Utilisateur cible introuvable                  |

---

### PUT `/friends/:friendshipId/respond`

Accepte ou refuse une demande d'ami reçue.

**Paramètre** `:friendshipId` — UUID de la relation

**Body**

| Champ  | Type   | Valeurs acceptées          |
|--------|--------|----------------------------|
| status | string | `"accepted"`, `"rejected"` |

**Réponse** `200`

```json
{
  "friendship": { "id": "uuid", "status": "accepted", "..." : "..." }
}
```

**Erreurs**

| Code | Description                              |
|------|------------------------------------------|
| 400  | Demande déjà répondue                    |
| 404  | Demande introuvable ou non destinée à toi|

---

### DELETE `/friends/:friendshipId`

Supprime une amitié (quel que soit son statut).

**Paramètre** `:friendshipId` — UUID de la relation

**Réponse** `200`

```json
{ "message": "Friend removed successfully" }
```

**Erreurs**

| Code | Description            |
|------|------------------------|
| 404  | Amitié introuvable     |

---

## Messages

> Toutes les routes `/messages` requièrent un token JWT.  
> L'envoi et la lecture de messages ne sont autorisés qu'**entre amis** (`status: accepted`).

### POST `/messages`

Envoie un message à un ami.

**Body**

| Champ      | Type (UUID) | Requis | Contraintes     |
|------------|-------------|--------|-----------------|
| receiverId | string      | oui    |                 |
| content    | string      | oui    | 1–2000 car.     |

**Réponse** `201`

```json
{
  "message": {
    "id": "uuid",
    "senderId": "uuid",
    "receiverId": "uuid",
    "content": "Salut !",
    "createdAt": "2026-05-16T10:00:00.000Z"
  }
}
```

**Erreurs**

| Code | Description                         |
|------|-------------------------------------|
| 400  | Message envoyé à soi-même           |
| 403  | Destinataire non ami de l'expéditeur|

---

### GET `/messages/:friendId`

Récupère l'historique de la conversation avec un ami, trié par date croissante.

**Paramètre** `:friendId` — UUID de l'ami

**Réponse** `200`

```json
{
  "messages": [
    {
      "id": "uuid",
      "senderId": "uuid",
      "receiverId": "uuid",
      "content": "Salut !",
      "createdAt": "2026-05-16T10:00:00.000Z"
    }
  ]
}
```

**Erreurs**

| Code | Description                    |
|------|--------------------------------|
| 403  | L'utilisateur cible n'est pas ami |

---

## Games

> Toutes les routes `/games` requièrent un token JWT.

### GET `/games`

Liste toutes les parties en attente de joueurs (`status: waiting`).

**Réponse** `200`

```json
{
  "games": [
    {
      "id": "uuid",
      "status": "waiting",
      "createdAt": "2026-05-16T10:00:00.000Z",
      "finishedAt": null
    }
  ]
}
```

---

### POST `/games`

Crée une nouvelle partie. Le créateur est automatiquement ajouté comme premier joueur.

**Réponse** `201`

```json
{
  "game": {
    "id": "uuid",
    "status": "waiting",
    "createdAt": "2026-05-16T10:00:00.000Z",
    "finishedAt": null
  }
}
```

---

### GET `/games/:gameId`

Retourne les détails d'une partie ainsi que la liste de ses joueurs.

**Paramètre** `:gameId` — UUID de la partie

**Réponse** `200`

```json
{
  "game": {
    "id": "uuid",
    "status": "in_progress",
    "createdAt": "2026-05-16T10:00:00.000Z",
    "finishedAt": null
  },
  "players": [
    {
      "userId": "uuid",
      "username": "pauline",
      "avatar": null,
      "score": 42,
      "joinedAt": "2026-05-16T10:00:00.000Z"
    }
  ]
}
```

**Erreurs**

| Code | Description          |
|------|----------------------|
| 404  | Partie introuvable   |

---

### POST `/games/:gameId/join`

Rejoindre une partie en attente.

**Paramètre** `:gameId` — UUID de la partie

**Réponse** `201`

```json
{ "message": "Joined game successfully" }
```

**Erreurs**

| Code | Description                             |
|------|-----------------------------------------|
| 400  | La partie n'est plus ouverte            |
| 400  | L'utilisateur est déjà dans cette partie|
| 404  | Partie introuvable                      |

---

### PUT `/games/:gameId/status`

Met à jour le statut d'une partie.

**Paramètre** `:gameId` — UUID de la partie

**Body**

| Champ  | Type   | Valeurs acceptées               |
|--------|--------|---------------------------------|
| status | string | `"in_progress"`, `"finished"`   |

> Passer à `"finished"` renseigne automatiquement `finishedAt`.

**Réponse** `200`

```json
{
  "game": { "id": "uuid", "status": "finished", "finishedAt": "2026-05-16T10:30:00.000Z" }
}
```

**Erreurs**

| Code | Description        |
|------|--------------------|
| 404  | Partie introuvable |

---

### PUT `/games/:gameId/score`

Met à jour le score du joueur connecté dans une partie.

**Paramètre** `:gameId` — UUID de la partie

**Body**

| Champ | Type    | Requis | Contraintes |
|-------|---------|--------|-------------|
| score | integer | oui    | ≥ 0         |

**Réponse** `200`

```json
{
  "player": {
    "id": "uuid",
    "gameId": "uuid",
    "userId": "uuid",
    "score": 150,
    "joinedAt": "2026-05-16T10:00:00.000Z"
  }
}
```

**Erreurs**

| Code | Description                           |
|------|---------------------------------------|
| 404  | Joueur non trouvé dans cette partie   |

---

### POST `/games/:gameId/messages`

Envoie un message dans le chat d'une partie. Réservé aux joueurs de la partie.

**Paramètre** `:gameId` — UUID de la partie

**Body**

| Champ   | Type   | Requis | Contraintes |
|---------|--------|--------|-------------|
| content | string | oui    | 1–2000 car. |

**Réponse** `201`

```json
{
  "message": {
    "id": "uuid",
    "gameId": "uuid",
    "senderId": "uuid",
    "content": "Allez on y va !",
    "createdAt": "2026-05-16T10:00:00.000Z"
  }
}
```

**Erreurs**

| Code | Description                                    |
|------|------------------------------------------------|
| 403  | L'utilisateur n'est pas joueur dans cette partie |

---

### GET `/games/:gameId/messages`

Récupère les messages du chat d'une partie, triés par date croissante. Réservé aux joueurs de la partie.

**Paramètre** `:gameId` — UUID de la partie

**Réponse** `200`

```json
{
  "messages": [
    {
      "id": "uuid",
      "content": "Allez on y va !",
      "createdAt": "2026-05-16T10:00:00.000Z",
      "sender": {
        "id": "uuid",
        "username": "pauline",
        "avatar": null
      }
    }
  ]
}
```

**Erreurs**

| Code | Description                                      |
|------|--------------------------------------------------|
| 403  | L'utilisateur n'est pas joueur dans cette partie |
| 404  | Partie introuvable                               |

---

## Variables d'environnement

| Variable                | Requis | Défaut        | Description                          |
|-------------------------|--------|---------------|--------------------------------------|
| `DATABASE_URL`          | oui    |               | URL PostgreSQL (`postgresql://...`)  |
| `JWT_SECRET`            | oui    |               | Clé secrète JWT (min. 32 car.)       |
| `JWT_EXPIRES_IN`        | non    | `7d`          | Durée de validité du token           |
| `PORT`                  | non    | `3000`        | Port du serveur                      |
| `HOST`                  | non    | `localhost`   | Hôte du serveur                      |
| `CORS_ORIGIN`           | non    | `[]`          | Origines autorisées (séparées par `,`)|
| `BCRYPT_ROUNDS`         | non    | `12`          | Nombre de rounds bcrypt (10–20)      |
| `DATABASE_POOL_MIN`     | non    | `2`           | Connexions min. dans le pool         |
| `DATABASE_POOL_MAX`     | non    | `10`          | Connexions max. dans le pool         |
| `APP_STAGE`             | non    | `dev`         | `dev`, `test`, `production`          |
