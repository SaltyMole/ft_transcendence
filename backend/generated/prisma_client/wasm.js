
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  avatarUrl: 'avatarUrl',
  passwordHash: 'passwordHash'
};

exports.Prisma.GameScalarFieldEnum = {
  id: 'id',
  status: 'status',
  maxPlayers: 'maxPlayers'
};

exports.Prisma.GamePlayerScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  gameId: 'gameId',
  score: 'score'
};

exports.Prisma.RoundScalarFieldEnum = {
  id: 'id',
  gameId: 'gameId',
  drawerId: 'drawerId',
  word: 'word'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  gameId: 'gameId',
  userId: 'userId',
  content: 'content',
  isCorrect: 'isCorrect'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Game: 'Game',
  GamePlayer: 'GamePlayer',
  Round: 'Round',
  Message: 'Message'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/zmurie/transcendence/backend/backend/generated/prisma_client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "rhel-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "/home/zmurie/transcendence/backend/backend/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "postgresql://postgres:prisma@localhost:5432/postgres?schema=public"
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"../generated/prisma_client\"\n\n  previewFeatures = [\"driverAdapters\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id           Int          @id @default(autoincrement())\n  username     String       @unique\n  games        GamePlayer[]\n  avatarUrl    String?\n  passwordHash String\n  drawnRounds  Round[]      @relation(\"UserDrawnRounds\")\n}\n\nmodel Game {\n  id         Int          @id @default(autoincrement())\n  status     String\n  maxPlayers Int\n  players    GamePlayer[]\n  rounds     Round[]\n}\n\nmodel GamePlayer {\n  id     Int  @id @default(autoincrement())\n  user   User @relation(fields: [userId], references: [id])\n  userId Int\n  game   Game @relation(fields: [gameId], references: [id])\n  gameId Int\n  score  Int  @default(0)\n}\n\nmodel Round {\n  id       Int    @id @default(autoincrement())\n  game     Game   @relation(fields: [gameId], references: [id])\n  gameId   Int\n  drawer   User   @relation(\"UserDrawnRounds\", fields: [drawerId], references: [id])\n  drawerId Int\n  word     String\n}\n\nmodel Message {\n  id        Int     @id @default(autoincrement())\n  gameId    Int\n  userId    Int\n  content   String\n  isCorrect Boolean\n}\n",
  "inlineSchemaHash": "3ee8c785f7c4a03d4977c636c78b68e407f0bfb2d203101bd513bf2abb69b20f",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"games\",\"kind\":\"object\",\"type\":\"GamePlayer\",\"relationName\":\"GamePlayerToUser\"},{\"name\":\"avatarUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"passwordHash\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"drawnRounds\",\"kind\":\"object\",\"type\":\"Round\",\"relationName\":\"UserDrawnRounds\"}],\"dbName\":null},\"Game\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"maxPlayers\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"players\",\"kind\":\"object\",\"type\":\"GamePlayer\",\"relationName\":\"GameToGamePlayer\"},{\"name\":\"rounds\",\"kind\":\"object\",\"type\":\"Round\",\"relationName\":\"GameToRound\"}],\"dbName\":null},\"GamePlayer\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"GamePlayerToUser\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"game\",\"kind\":\"object\",\"type\":\"Game\",\"relationName\":\"GameToGamePlayer\"},{\"name\":\"gameId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Int\"}],\"dbName\":null},\"Round\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"game\",\"kind\":\"object\",\"type\":\"Game\",\"relationName\":\"GameToRound\"},{\"name\":\"gameId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"drawer\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserDrawnRounds\"},{\"name\":\"drawerId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"word\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null},\"Message\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"gameId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isCorrect\",\"kind\":\"scalar\",\"type\":\"Boolean\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: async () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine
  }
}
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

