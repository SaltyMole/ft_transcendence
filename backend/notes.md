# express
    Express, is a back end web application framework for Node.js.
    Une application Express est fondamentalement une série de fonctions appelées middleware.
    Chaque élément de middleware reçoit les objets request et response, peut les lire, 
    les analyser et les manipuler, le cas échéant.
    Le middleware Express reçoit également la méthode next,
    qui permet à chaque middleware de passer l'exécution au middleware suivant. 

# ORM (Object-Relational Mapping)
    Prisma ==> ORM (Object-Relational Mapping) pour Node.js et TypeScript. 
    C'est un programme qui se place en interface entre un programme applicatif et une base de données relationnelle pour simuler une base de données orientée objet.
    L'un des avantages est que cela réduit la quantité de code qui doit être écrit et permet une homogénéité avec le reste du code pour les langages orientés objets. 
- npm is a package manager for the JavaScript programming language.
- Node.js ==> runtime

# npm
    npm est le gestionnaire de paquets par défaut pour l'environnement d'exécution JavaScript Node.js. 


# Routage

Routage fait référence à la détermination de la façon dont une application répond à un nœud final spécifique,
c’est-à-dire un URI (ou chemin) et une méthode de requête HTTP (GET, POST, etc.).
Chaque route peut avoir une ou plusieurs fonctions de gestionnaire, qui sont exécutées lorsque la route est mise en correspondance.
La définition de la route utilise la structure suivante :

```
app.METHOD(PATH, HANDLER)

Où :

    app est une instance d’express.
    METHOD is an HTTP request method, in lowercase.
    PATH est un chemin sur le serveur.
    HANDLER est la fonction exécutée lorsque la route est mise en correspondance.
```


# Controller
A controller in Express.js is a module or function that handles the logic when a route is called.
Instead of writing all the logic inside the route definition, controllers allow you to offload that functionality to separate files.
This structure ensures that your routing logic and request-handling logic are separate, leading to more readable, reusable, and testable code.

# Packages
## multer
    un package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP. 

## bcrypt
    un package de chiffrement qui utilise un algorithme unidirectionnel pour chiffrer et créer un hash des mots de passe utilisateur.

## JWT 
    Les tokens d'authentification permettent aux utilisateurs de se connecter une seule fois à leur compte.
    Au moment de se connecter, ils recevront leur token et le renverront automatiquement à chaque requête par la suite.
    Ceci permettra au back-end de vérifier que la requête est authentifiée.
    Nous utilisons la fonction sign de jsonwebtoken pour chiffrer un nouveau token.

  
  controllers/
  auth.js    → signup, login, logout (tout ce qui concerne l'authentification)
  user.js    → getProfile, updateProfile, deleteAccount (gestion du compte)
  
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "zoé", "email": "zoe@test.com", "password": "test1234"}'

curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "nathan", "email": "nathan@test.com", "password": "test1234"}'
  
  
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "zoé", "password": "test1234"}'
  
  
  
curl -X POST http://localhost:3000/api/friends/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_ZOE" \
  -d '{"receiverId": ID_NATHAN}'
  
  
curl -X POST http://localhost:3000/api/friends/accept/1 \
  -H "Authorization: Bearer TOKEN_NATHAN"

curl http://localhost:3000/api/friends \
  -H "Authorization: Bearer TOKEN_ZOE"