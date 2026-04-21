
/**
 * Client
 */

import * as runtime from '@prisma/client/runtime/library'
import * as process from 'node:process'
import * as path from 'node:path'
    import { fileURLToPath } from 'node:url'

    const __dirname = path.dirname(fileURLToPath(import.meta.url))


export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Game
 * 
 */
export type Game = runtime.Types.Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model GamePlayer
 * 
 */
export type GamePlayer = runtime.Types.Result.DefaultSelection<Prisma.$GamePlayerPayload>
/**
 * Model Round
 * 
 */
export type Round = runtime.Types.Result.DefaultSelection<Prisma.$RoundPayload>
/**
 * Model Message
 * 
 */
export type Message = runtime.Types.Result.DefaultSelection<Prisma.$MessagePayload>



/**
 * Create the Client
 */
const config: runtime.GetPrismaClientConfig = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client"
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
        "value": "debian-openssl-1.1.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/zmurie/transcendence/backend/backend/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativePath": "../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma_client\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel User {\n  id          Int          @id @default(autoincrement())\n  username    String       @unique\n  games       GamePlayer[]\n  drawnRounds Round[]      @relation(\"UserDrawnRounds\")\n}\n\nmodel Game {\n  id         Int          @id @default(autoincrement())\n  status     String\n  maxPlayers Int\n  players    GamePlayer[]\n  rounds     Round[]\n}\n\nmodel GamePlayer {\n  id     Int  @id @default(autoincrement())\n  user   User @relation(fields: [userId], references: [id])\n  userId Int\n  game   Game @relation(fields: [gameId], references: [id])\n  gameId Int\n  score  Int  @default(0)\n}\n\nmodel Round {\n  id       Int    @id @default(autoincrement())\n  game     Game   @relation(fields: [gameId], references: [id])\n  gameId   Int\n  drawer   User   @relation(\"UserDrawnRounds\", fields: [drawerId], references: [id])\n  drawerId Int\n  word     String\n}\n\nmodel Message {\n  id        Int     @id @default(autoincrement())\n  gameId    Int\n  userId    Int\n  content   String\n  isCorrect Boolean\n}\n",
  "inlineSchemaHash": "c9ad26521fa465d9317770e0422092b86be555e96e1f1d718fcabb43ce1cb35a",
  "copyEngine": true,
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "dirname": ""
}
config.dirname = __dirname

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"games\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GamePlayer\",\"nativeType\":null,\"relationName\":\"GamePlayerToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drawnRounds\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Round\",\"nativeType\":null,\"relationName\":\"UserDrawnRounds\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Game\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxPlayers\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"players\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GamePlayer\",\"nativeType\":null,\"relationName\":\"GameToGamePlayer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rounds\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Round\",\"nativeType\":null,\"relationName\":\"GameToRound\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GamePlayer\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"GamePlayerToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"game\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Game\",\"nativeType\":null,\"relationName\":\"GameToGamePlayer\",\"relationFromFields\":[\"gameId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gameId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Round\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"game\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Game\",\"nativeType\":null,\"relationName\":\"GameToRound\",\"relationFromFields\":[\"gameId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gameId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drawer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"nativeType\":null,\"relationName\":\"UserDrawnRounds\",\"relationFromFields\":[\"drawerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drawerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"word\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Message\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gameId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isCorrect\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
config.engineWasm = undefined
config.compilerWasm = undefined



// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-1.1.x.so.node")
path.join(process.cwd(), "generated/prisma_client/libquery_engine-debian-openssl-1.1.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma")
path.join(process.cwd(), "generated/prisma_client/schema.prisma")


interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  new <
    ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
    ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
  >(options?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>): PrismaClient<ClientOptions, U, ExtArgs>
}

/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): runtime.Types.Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): runtime.Types.Utils.JsPromise<R>


  $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gamePlayer`: Exposes CRUD operations for the **GamePlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GamePlayers
    * const gamePlayers = await prisma.gamePlayer.findMany()
    * ```
    */
  get gamePlayer(): Prisma.GamePlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.round`: Exposes CRUD operations for the **Round** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rounds
    * const rounds = await prisma.round.findMany()
    * ```
    */
  get round(): Prisma.RoundDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;
}

export const PrismaClient = runtime.getPrismaClient(config) as unknown as PrismaClientConstructor

export namespace Prisma {
  export type DMMF = typeof runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Validator
   */
  export const validator = runtime.Public.validator

  /**
   * Prisma Errors
   */

  export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError

  export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError

  export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError

  export const PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export type PrismaClientInitializationError = runtime.PrismaClientInitializationError

  export const PrismaClientValidationError = runtime.PrismaClientValidationError
  export type PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export const sql = runtime.sqltag
  export const empty = runtime.empty
  export const join = runtime.join
  export const raw = runtime.raw
  export const Sql = runtime.Sql
  export type Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export const Decimal = runtime.Decimal
  export type Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = runtime.Types.Extensions.UserArgs
  export const getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>
  export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>
  export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>
  export type Exact<A, W> = runtime.Types.Public.Exact<A, W>

  export type PrismaVersion = {
    client: string
    engine: string
  }

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export const prismaVersion: PrismaVersion = {
    client: "6.6.0",
    engine: "f676762280b54cd07c770017ed3711ddde35f37a"
  }

  /**
   * Utility Types
   */


  export type JsonObject = runtime.JsonObject
  export type JsonArray = runtime.JsonArray
  export type JsonValue = runtime.JsonValue
  export type InputJsonObject = runtime.InputJsonObject
  export type InputJsonArray = runtime.InputJsonArray
  export type InputJsonValue = runtime.InputJsonValue

  export const NullTypes = {
    DbNull: runtime.objectEnumValues.classes.DbNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull),
    JsonNull: runtime.objectEnumValues.classes.JsonNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull),
    AnyNull: runtime.objectEnumValues.classes.AnyNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull),
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull = runtime.objectEnumValues.instances.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull = runtime.objectEnumValues.instances.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull = runtime.objectEnumValues.instances.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  export type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  export type Boolean = True | False

  export type True = 1

  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName = {
    User: 'User',
    Game: 'Game',
    GamePlayer: 'GamePlayer',
    Round: 'Round',
    Message: 'Message'
  } as const

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export interface TypeMapCb<ClientOptions = {}> extends runtime.Types.Utils.Fn<{extArgs: runtime.Types.Extensions.InternalArgs }, runtime.Types.Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "game" | "gamePlayer" | "round" | "message"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      GamePlayer: {
        payload: Prisma.$GamePlayerPayload<ExtArgs>
        fields: Prisma.GamePlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GamePlayerFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GamePlayerFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          findFirst: {
            args: Prisma.GamePlayerFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GamePlayerFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          findMany: {
            args: Prisma.GamePlayerFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          create: {
            args: Prisma.GamePlayerCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          createMany: {
            args: Prisma.GamePlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GamePlayerCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          delete: {
            args: Prisma.GamePlayerDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          update: {
            args: Prisma.GamePlayerUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          deleteMany: {
            args: Prisma.GamePlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GamePlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GamePlayerUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload>[]
          }
          upsert: {
            args: Prisma.GamePlayerUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$GamePlayerPayload>
          }
          aggregate: {
            args: Prisma.GamePlayerAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateGamePlayer>
          }
          groupBy: {
            args: Prisma.GamePlayerGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<GamePlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.GamePlayerCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<GamePlayerCountAggregateOutputType> | number
          }
        }
      }
      Round: {
        payload: Prisma.$RoundPayload<ExtArgs>
        fields: Prisma.RoundFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoundFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoundFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload>
          }
          findFirst: {
            args: Prisma.RoundFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoundFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload>
          }
          findMany: {
            args: Prisma.RoundFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload>[]
          }
          create: {
            args: Prisma.RoundCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload>
          }
          createMany: {
            args: Prisma.RoundCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoundCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload>[]
          }
          delete: {
            args: Prisma.RoundDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload>
          }
          update: {
            args: Prisma.RoundUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload>
          }
          deleteMany: {
            args: Prisma.RoundDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoundUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoundUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload>[]
          }
          upsert: {
            args: Prisma.RoundUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$RoundPayload>
          }
          aggregate: {
            args: Prisma.RoundAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateRound>
          }
          groupBy: {
            args: Prisma.RoundGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<RoundGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoundCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<RoundCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: runtime.Types.Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension = runtime.Extensions.defineExtension as unknown as runtime.Types.Extensions.ExtendsHook<"define", Prisma.TypeMapCb, runtime.Types.Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    game?: GameOmit
    gamePlayer?: GamePlayerOmit
    round?: RoundOmit
    message?: MessageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => runtime.Types.Utils.JsPromise<T>,
  ) => runtime.Types.Utils.JsPromise<T>

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    games: number
    drawnRounds: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    games?: boolean | UserCountOutputTypeCountGamesArgs
    drawnRounds?: boolean | UserCountOutputTypeCountDrawnRoundsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGamesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: GamePlayerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDrawnRoundsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: RoundWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    players: number
    rounds: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    players?: boolean | GameCountOutputTypeCountPlayersArgs
    rounds?: boolean | GameCountOutputTypeCountRoundsArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountPlayersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: GamePlayerWhereInput
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountRoundsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: RoundWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    games?: boolean | User$gamesArgs<ExtArgs>
    drawnRounds?: boolean | User$drawnRoundsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
  }

  export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "username", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    games?: boolean | User$gamesArgs<ExtArgs>
    drawnRounds?: boolean | User$drawnRoundsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      games: Prisma.$GamePlayerPayload<ExtArgs>[]
      drawnRounds: Prisma.$RoundPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: number
      username: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>

  export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    games<T extends User$gamesArgs<ExtArgs> = {}>(args?: Subset<T, User$gamesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    drawnRounds<T extends User$drawnRoundsArgs<ExtArgs> = {}>(args?: Subset<T, User$drawnRoundsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  export interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.games
   */
  export type User$gamesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    where?: GamePlayerWhereInput
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    cursor?: GamePlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * User.drawnRounds
   */
  export type User$drawnRoundsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    where?: RoundWhereInput
    orderBy?: RoundOrderByWithRelationInput | RoundOrderByWithRelationInput[]
    cursor?: RoundWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoundScalarFieldEnum | RoundScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    id: number | null
    maxPlayers: number | null
  }

  export type GameSumAggregateOutputType = {
    id: number | null
    maxPlayers: number | null
  }

  export type GameMinAggregateOutputType = {
    id: number | null
    status: string | null
    maxPlayers: number | null
  }

  export type GameMaxAggregateOutputType = {
    id: number | null
    status: string | null
    maxPlayers: number | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    status: number
    maxPlayers: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    id?: true
    maxPlayers?: true
  }

  export type GameSumAggregateInputType = {
    id?: true
    maxPlayers?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    status?: true
    maxPlayers?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    status?: true
    maxPlayers?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    status?: true
    maxPlayers?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: number
    status: string
    maxPlayers: number
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    maxPlayers?: boolean
    players?: boolean | Game$playersArgs<ExtArgs>
    rounds?: boolean | Game$roundsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    maxPlayers?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    maxPlayers?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    status?: boolean
    maxPlayers?: boolean
  }

  export type GameOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "status" | "maxPlayers", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    players?: boolean | Game$playersArgs<ExtArgs>
    rounds?: boolean | Game$roundsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {}

  export type $GamePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      players: Prisma.$GamePlayerPayload<ExtArgs>[]
      rounds: Prisma.$RoundPayload<ExtArgs>[]
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: number
      status: string
      maxPlayers: number
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  export type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GamePayload, S>

  export type GameCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends Game$playersArgs<ExtArgs> = {}>(args?: Subset<T, Game$playersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rounds<T extends Game$roundsArgs<ExtArgs> = {}>(args?: Subset<T, Game$roundsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  export interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'Int'>
    readonly status: FieldRef<"Game", 'String'>
    readonly maxPlayers: FieldRef<"Game", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.players
   */
  export type Game$playersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    where?: GamePlayerWhereInput
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    cursor?: GamePlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * Game.rounds
   */
  export type Game$roundsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    where?: RoundWhereInput
    orderBy?: RoundOrderByWithRelationInput | RoundOrderByWithRelationInput[]
    cursor?: RoundWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoundScalarFieldEnum | RoundScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model GamePlayer
   */

  export type AggregateGamePlayer = {
    _count: GamePlayerCountAggregateOutputType | null
    _avg: GamePlayerAvgAggregateOutputType | null
    _sum: GamePlayerSumAggregateOutputType | null
    _min: GamePlayerMinAggregateOutputType | null
    _max: GamePlayerMaxAggregateOutputType | null
  }

  export type GamePlayerAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    score: number | null
  }

  export type GamePlayerSumAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    score: number | null
  }

  export type GamePlayerMinAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    score: number | null
  }

  export type GamePlayerMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    gameId: number | null
    score: number | null
  }

  export type GamePlayerCountAggregateOutputType = {
    id: number
    userId: number
    gameId: number
    score: number
    _all: number
  }


  export type GamePlayerAvgAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    score?: true
  }

  export type GamePlayerSumAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    score?: true
  }

  export type GamePlayerMinAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    score?: true
  }

  export type GamePlayerMaxAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    score?: true
  }

  export type GamePlayerCountAggregateInputType = {
    id?: true
    userId?: true
    gameId?: true
    score?: true
    _all?: true
  }

  export type GamePlayerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which GamePlayer to aggregate.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GamePlayers
    **/
    _count?: true | GamePlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GamePlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GamePlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GamePlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GamePlayerMaxAggregateInputType
  }

  export type GetGamePlayerAggregateType<T extends GamePlayerAggregateArgs> = {
        [P in keyof T & keyof AggregateGamePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGamePlayer[P]>
      : GetScalarType<T[P], AggregateGamePlayer[P]>
  }




  export type GamePlayerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: GamePlayerWhereInput
    orderBy?: GamePlayerOrderByWithAggregationInput | GamePlayerOrderByWithAggregationInput[]
    by: GamePlayerScalarFieldEnum[] | GamePlayerScalarFieldEnum
    having?: GamePlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GamePlayerCountAggregateInputType | true
    _avg?: GamePlayerAvgAggregateInputType
    _sum?: GamePlayerSumAggregateInputType
    _min?: GamePlayerMinAggregateInputType
    _max?: GamePlayerMaxAggregateInputType
  }

  export type GamePlayerGroupByOutputType = {
    id: number
    userId: number
    gameId: number
    score: number
    _count: GamePlayerCountAggregateOutputType | null
    _avg: GamePlayerAvgAggregateOutputType | null
    _sum: GamePlayerSumAggregateOutputType | null
    _min: GamePlayerMinAggregateOutputType | null
    _max: GamePlayerMaxAggregateOutputType | null
  }

  type GetGamePlayerGroupByPayload<T extends GamePlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GamePlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GamePlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GamePlayerGroupByOutputType[P]>
            : GetScalarType<T[P], GamePlayerGroupByOutputType[P]>
        }
      >
    >


  export type GamePlayerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    score?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gamePlayer"]>

  export type GamePlayerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    score?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gamePlayer"]>

  export type GamePlayerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    gameId?: boolean
    score?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gamePlayer"]>

  export type GamePlayerSelectScalar = {
    id?: boolean
    userId?: boolean
    gameId?: boolean
    score?: boolean
  }

  export type GamePlayerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "gameId" | "score", ExtArgs["result"]["gamePlayer"]>
  export type GamePlayerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }
  export type GamePlayerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }
  export type GamePlayerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    game?: boolean | GameDefaultArgs<ExtArgs>
  }

  export type $GamePlayerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "GamePlayer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      game: Prisma.$GamePayload<ExtArgs>
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: number
      userId: number
      gameId: number
      score: number
    }, ExtArgs["result"]["gamePlayer"]>
    composites: {}
  }

  export type GamePlayerGetPayload<S extends boolean | null | undefined | GamePlayerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload, S>

  export type GamePlayerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<GamePlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GamePlayerCountAggregateInputType | true
    }

  export interface GamePlayerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GamePlayer'], meta: { name: 'GamePlayer' } }
    /**
     * Find zero or one GamePlayer that matches the filter.
     * @param {GamePlayerFindUniqueArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GamePlayerFindUniqueArgs>(args: SelectSubset<T, GamePlayerFindUniqueArgs<ExtArgs>>): Prisma__GamePlayerClient<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GamePlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GamePlayerFindUniqueOrThrowArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GamePlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, GamePlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GamePlayerClient<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GamePlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindFirstArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GamePlayerFindFirstArgs>(args?: SelectSubset<T, GamePlayerFindFirstArgs<ExtArgs>>): Prisma__GamePlayerClient<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GamePlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindFirstOrThrowArgs} args - Arguments to find a GamePlayer
     * @example
     * // Get one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GamePlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, GamePlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__GamePlayerClient<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GamePlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GamePlayers
     * const gamePlayers = await prisma.gamePlayer.findMany()
     * 
     * // Get first 10 GamePlayers
     * const gamePlayers = await prisma.gamePlayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GamePlayerFindManyArgs>(args?: SelectSubset<T, GamePlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GamePlayer.
     * @param {GamePlayerCreateArgs} args - Arguments to create a GamePlayer.
     * @example
     * // Create one GamePlayer
     * const GamePlayer = await prisma.gamePlayer.create({
     *   data: {
     *     // ... data to create a GamePlayer
     *   }
     * })
     * 
     */
    create<T extends GamePlayerCreateArgs>(args: SelectSubset<T, GamePlayerCreateArgs<ExtArgs>>): Prisma__GamePlayerClient<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GamePlayers.
     * @param {GamePlayerCreateManyArgs} args - Arguments to create many GamePlayers.
     * @example
     * // Create many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GamePlayerCreateManyArgs>(args?: SelectSubset<T, GamePlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GamePlayers and returns the data saved in the database.
     * @param {GamePlayerCreateManyAndReturnArgs} args - Arguments to create many GamePlayers.
     * @example
     * // Create many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GamePlayers and only return the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GamePlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, GamePlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GamePlayer.
     * @param {GamePlayerDeleteArgs} args - Arguments to delete one GamePlayer.
     * @example
     * // Delete one GamePlayer
     * const GamePlayer = await prisma.gamePlayer.delete({
     *   where: {
     *     // ... filter to delete one GamePlayer
     *   }
     * })
     * 
     */
    delete<T extends GamePlayerDeleteArgs>(args: SelectSubset<T, GamePlayerDeleteArgs<ExtArgs>>): Prisma__GamePlayerClient<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GamePlayer.
     * @param {GamePlayerUpdateArgs} args - Arguments to update one GamePlayer.
     * @example
     * // Update one GamePlayer
     * const gamePlayer = await prisma.gamePlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GamePlayerUpdateArgs>(args: SelectSubset<T, GamePlayerUpdateArgs<ExtArgs>>): Prisma__GamePlayerClient<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GamePlayers.
     * @param {GamePlayerDeleteManyArgs} args - Arguments to filter GamePlayers to delete.
     * @example
     * // Delete a few GamePlayers
     * const { count } = await prisma.gamePlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GamePlayerDeleteManyArgs>(args?: SelectSubset<T, GamePlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamePlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GamePlayerUpdateManyArgs>(args: SelectSubset<T, GamePlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GamePlayers and returns the data updated in the database.
     * @param {GamePlayerUpdateManyAndReturnArgs} args - Arguments to update many GamePlayers.
     * @example
     * // Update many GamePlayers
     * const gamePlayer = await prisma.gamePlayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GamePlayers and only return the `id`
     * const gamePlayerWithIdOnly = await prisma.gamePlayer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GamePlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, GamePlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GamePlayer.
     * @param {GamePlayerUpsertArgs} args - Arguments to update or create a GamePlayer.
     * @example
     * // Update or create a GamePlayer
     * const gamePlayer = await prisma.gamePlayer.upsert({
     *   create: {
     *     // ... data to create a GamePlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GamePlayer we want to update
     *   }
     * })
     */
    upsert<T extends GamePlayerUpsertArgs>(args: SelectSubset<T, GamePlayerUpsertArgs<ExtArgs>>): Prisma__GamePlayerClient<runtime.Types.Result.GetResult<Prisma.$GamePlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GamePlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerCountArgs} args - Arguments to filter GamePlayers to count.
     * @example
     * // Count the number of GamePlayers
     * const count = await prisma.gamePlayer.count({
     *   where: {
     *     // ... the filter for the GamePlayers we want to count
     *   }
     * })
    **/
    count<T extends GamePlayerCountArgs>(
      args?: Subset<T, GamePlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GamePlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GamePlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GamePlayerAggregateArgs>(args: Subset<T, GamePlayerAggregateArgs>): Prisma.PrismaPromise<GetGamePlayerAggregateType<T>>

    /**
     * Group by GamePlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GamePlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GamePlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GamePlayerGroupByArgs['orderBy'] }
        : { orderBy?: GamePlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GamePlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGamePlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GamePlayer model
   */
  readonly fields: GamePlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GamePlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GamePlayerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the GamePlayer model
   */
  export interface GamePlayerFieldRefs {
    readonly id: FieldRef<"GamePlayer", 'Int'>
    readonly userId: FieldRef<"GamePlayer", 'Int'>
    readonly gameId: FieldRef<"GamePlayer", 'Int'>
    readonly score: FieldRef<"GamePlayer", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * GamePlayer findUnique
   */
  export type GamePlayerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer findUniqueOrThrow
   */
  export type GamePlayerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer findFirst
   */
  export type GamePlayerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GamePlayers.
     */
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer findFirstOrThrow
   */
  export type GamePlayerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayer to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GamePlayers.
     */
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer findMany
   */
  export type GamePlayerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter, which GamePlayers to fetch.
     */
    where?: GamePlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GamePlayers to fetch.
     */
    orderBy?: GamePlayerOrderByWithRelationInput | GamePlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GamePlayers.
     */
    cursor?: GamePlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GamePlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GamePlayers.
     */
    skip?: number
    distinct?: GamePlayerScalarFieldEnum | GamePlayerScalarFieldEnum[]
  }

  /**
   * GamePlayer create
   */
  export type GamePlayerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a GamePlayer.
     */
    data: XOR<GamePlayerCreateInput, GamePlayerUncheckedCreateInput>
  }

  /**
   * GamePlayer createMany
   */
  export type GamePlayerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many GamePlayers.
     */
    data: GamePlayerCreateManyInput | GamePlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GamePlayer createManyAndReturn
   */
  export type GamePlayerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * The data used to create many GamePlayers.
     */
    data: GamePlayerCreateManyInput | GamePlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GamePlayer update
   */
  export type GamePlayerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a GamePlayer.
     */
    data: XOR<GamePlayerUpdateInput, GamePlayerUncheckedUpdateInput>
    /**
     * Choose, which GamePlayer to update.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer updateMany
   */
  export type GamePlayerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update GamePlayers.
     */
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyInput>
    /**
     * Filter which GamePlayers to update
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to update.
     */
    limit?: number
  }

  /**
   * GamePlayer updateManyAndReturn
   */
  export type GamePlayerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * The data used to update GamePlayers.
     */
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyInput>
    /**
     * Filter which GamePlayers to update
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GamePlayer upsert
   */
  export type GamePlayerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the GamePlayer to update in case it exists.
     */
    where: GamePlayerWhereUniqueInput
    /**
     * In case the GamePlayer found by the `where` argument doesn't exist, create a new GamePlayer with this data.
     */
    create: XOR<GamePlayerCreateInput, GamePlayerUncheckedCreateInput>
    /**
     * In case the GamePlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GamePlayerUpdateInput, GamePlayerUncheckedUpdateInput>
  }

  /**
   * GamePlayer delete
   */
  export type GamePlayerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
    /**
     * Filter which GamePlayer to delete.
     */
    where: GamePlayerWhereUniqueInput
  }

  /**
   * GamePlayer deleteMany
   */
  export type GamePlayerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which GamePlayers to delete
     */
    where?: GamePlayerWhereInput
    /**
     * Limit how many GamePlayers to delete.
     */
    limit?: number
  }

  /**
   * GamePlayer without action
   */
  export type GamePlayerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GamePlayer
     */
    select?: GamePlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GamePlayer
     */
    omit?: GamePlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GamePlayerInclude<ExtArgs> | null
  }


  /**
   * Model Round
   */

  export type AggregateRound = {
    _count: RoundCountAggregateOutputType | null
    _avg: RoundAvgAggregateOutputType | null
    _sum: RoundSumAggregateOutputType | null
    _min: RoundMinAggregateOutputType | null
    _max: RoundMaxAggregateOutputType | null
  }

  export type RoundAvgAggregateOutputType = {
    id: number | null
    gameId: number | null
    drawerId: number | null
  }

  export type RoundSumAggregateOutputType = {
    id: number | null
    gameId: number | null
    drawerId: number | null
  }

  export type RoundMinAggregateOutputType = {
    id: number | null
    gameId: number | null
    drawerId: number | null
    word: string | null
  }

  export type RoundMaxAggregateOutputType = {
    id: number | null
    gameId: number | null
    drawerId: number | null
    word: string | null
  }

  export type RoundCountAggregateOutputType = {
    id: number
    gameId: number
    drawerId: number
    word: number
    _all: number
  }


  export type RoundAvgAggregateInputType = {
    id?: true
    gameId?: true
    drawerId?: true
  }

  export type RoundSumAggregateInputType = {
    id?: true
    gameId?: true
    drawerId?: true
  }

  export type RoundMinAggregateInputType = {
    id?: true
    gameId?: true
    drawerId?: true
    word?: true
  }

  export type RoundMaxAggregateInputType = {
    id?: true
    gameId?: true
    drawerId?: true
    word?: true
  }

  export type RoundCountAggregateInputType = {
    id?: true
    gameId?: true
    drawerId?: true
    word?: true
    _all?: true
  }

  export type RoundAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Round to aggregate.
     */
    where?: RoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rounds to fetch.
     */
    orderBy?: RoundOrderByWithRelationInput | RoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rounds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rounds
    **/
    _count?: true | RoundCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoundAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoundSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoundMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoundMaxAggregateInputType
  }

  export type GetRoundAggregateType<T extends RoundAggregateArgs> = {
        [P in keyof T & keyof AggregateRound]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRound[P]>
      : GetScalarType<T[P], AggregateRound[P]>
  }




  export type RoundGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: RoundWhereInput
    orderBy?: RoundOrderByWithAggregationInput | RoundOrderByWithAggregationInput[]
    by: RoundScalarFieldEnum[] | RoundScalarFieldEnum
    having?: RoundScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoundCountAggregateInputType | true
    _avg?: RoundAvgAggregateInputType
    _sum?: RoundSumAggregateInputType
    _min?: RoundMinAggregateInputType
    _max?: RoundMaxAggregateInputType
  }

  export type RoundGroupByOutputType = {
    id: number
    gameId: number
    drawerId: number
    word: string
    _count: RoundCountAggregateOutputType | null
    _avg: RoundAvgAggregateOutputType | null
    _sum: RoundSumAggregateOutputType | null
    _min: RoundMinAggregateOutputType | null
    _max: RoundMaxAggregateOutputType | null
  }

  type GetRoundGroupByPayload<T extends RoundGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoundGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoundGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoundGroupByOutputType[P]>
            : GetScalarType<T[P], RoundGroupByOutputType[P]>
        }
      >
    >


  export type RoundSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    drawerId?: boolean
    word?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    drawer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["round"]>

  export type RoundSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    drawerId?: boolean
    word?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    drawer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["round"]>

  export type RoundSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    drawerId?: boolean
    word?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    drawer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["round"]>

  export type RoundSelectScalar = {
    id?: boolean
    gameId?: boolean
    drawerId?: boolean
    word?: boolean
  }

  export type RoundOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "gameId" | "drawerId" | "word", ExtArgs["result"]["round"]>
  export type RoundInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    drawer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoundIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    drawer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoundIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    drawer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoundPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Round"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      drawer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: number
      gameId: number
      drawerId: number
      word: string
    }, ExtArgs["result"]["round"]>
    composites: {}
  }

  export type RoundGetPayload<S extends boolean | null | undefined | RoundDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoundPayload, S>

  export type RoundCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<RoundFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoundCountAggregateInputType | true
    }

  export interface RoundDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Round'], meta: { name: 'Round' } }
    /**
     * Find zero or one Round that matches the filter.
     * @param {RoundFindUniqueArgs} args - Arguments to find a Round
     * @example
     * // Get one Round
     * const round = await prisma.round.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoundFindUniqueArgs>(args: SelectSubset<T, RoundFindUniqueArgs<ExtArgs>>): Prisma__RoundClient<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Round that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoundFindUniqueOrThrowArgs} args - Arguments to find a Round
     * @example
     * // Get one Round
     * const round = await prisma.round.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoundFindUniqueOrThrowArgs>(args: SelectSubset<T, RoundFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoundClient<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Round that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundFindFirstArgs} args - Arguments to find a Round
     * @example
     * // Get one Round
     * const round = await prisma.round.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoundFindFirstArgs>(args?: SelectSubset<T, RoundFindFirstArgs<ExtArgs>>): Prisma__RoundClient<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Round that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundFindFirstOrThrowArgs} args - Arguments to find a Round
     * @example
     * // Get one Round
     * const round = await prisma.round.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoundFindFirstOrThrowArgs>(args?: SelectSubset<T, RoundFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoundClient<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rounds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rounds
     * const rounds = await prisma.round.findMany()
     * 
     * // Get first 10 Rounds
     * const rounds = await prisma.round.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roundWithIdOnly = await prisma.round.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoundFindManyArgs>(args?: SelectSubset<T, RoundFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Round.
     * @param {RoundCreateArgs} args - Arguments to create a Round.
     * @example
     * // Create one Round
     * const Round = await prisma.round.create({
     *   data: {
     *     // ... data to create a Round
     *   }
     * })
     * 
     */
    create<T extends RoundCreateArgs>(args: SelectSubset<T, RoundCreateArgs<ExtArgs>>): Prisma__RoundClient<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rounds.
     * @param {RoundCreateManyArgs} args - Arguments to create many Rounds.
     * @example
     * // Create many Rounds
     * const round = await prisma.round.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoundCreateManyArgs>(args?: SelectSubset<T, RoundCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rounds and returns the data saved in the database.
     * @param {RoundCreateManyAndReturnArgs} args - Arguments to create many Rounds.
     * @example
     * // Create many Rounds
     * const round = await prisma.round.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rounds and only return the `id`
     * const roundWithIdOnly = await prisma.round.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoundCreateManyAndReturnArgs>(args?: SelectSubset<T, RoundCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Round.
     * @param {RoundDeleteArgs} args - Arguments to delete one Round.
     * @example
     * // Delete one Round
     * const Round = await prisma.round.delete({
     *   where: {
     *     // ... filter to delete one Round
     *   }
     * })
     * 
     */
    delete<T extends RoundDeleteArgs>(args: SelectSubset<T, RoundDeleteArgs<ExtArgs>>): Prisma__RoundClient<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Round.
     * @param {RoundUpdateArgs} args - Arguments to update one Round.
     * @example
     * // Update one Round
     * const round = await prisma.round.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoundUpdateArgs>(args: SelectSubset<T, RoundUpdateArgs<ExtArgs>>): Prisma__RoundClient<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rounds.
     * @param {RoundDeleteManyArgs} args - Arguments to filter Rounds to delete.
     * @example
     * // Delete a few Rounds
     * const { count } = await prisma.round.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoundDeleteManyArgs>(args?: SelectSubset<T, RoundDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rounds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rounds
     * const round = await prisma.round.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoundUpdateManyArgs>(args: SelectSubset<T, RoundUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rounds and returns the data updated in the database.
     * @param {RoundUpdateManyAndReturnArgs} args - Arguments to update many Rounds.
     * @example
     * // Update many Rounds
     * const round = await prisma.round.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rounds and only return the `id`
     * const roundWithIdOnly = await prisma.round.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoundUpdateManyAndReturnArgs>(args: SelectSubset<T, RoundUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Round.
     * @param {RoundUpsertArgs} args - Arguments to update or create a Round.
     * @example
     * // Update or create a Round
     * const round = await prisma.round.upsert({
     *   create: {
     *     // ... data to create a Round
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Round we want to update
     *   }
     * })
     */
    upsert<T extends RoundUpsertArgs>(args: SelectSubset<T, RoundUpsertArgs<ExtArgs>>): Prisma__RoundClient<runtime.Types.Result.GetResult<Prisma.$RoundPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rounds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundCountArgs} args - Arguments to filter Rounds to count.
     * @example
     * // Count the number of Rounds
     * const count = await prisma.round.count({
     *   where: {
     *     // ... the filter for the Rounds we want to count
     *   }
     * })
    **/
    count<T extends RoundCountArgs>(
      args?: Subset<T, RoundCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoundCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Round.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoundAggregateArgs>(args: Subset<T, RoundAggregateArgs>): Prisma.PrismaPromise<GetRoundAggregateType<T>>

    /**
     * Group by Round.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoundGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoundGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoundGroupByArgs['orderBy'] }
        : { orderBy?: RoundGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoundGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoundGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Round model
   */
  readonly fields: RoundFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Round.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoundClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<runtime.Types.Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    drawer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the Round model
   */
  export interface RoundFieldRefs {
    readonly id: FieldRef<"Round", 'Int'>
    readonly gameId: FieldRef<"Round", 'Int'>
    readonly drawerId: FieldRef<"Round", 'Int'>
    readonly word: FieldRef<"Round", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Round findUnique
   */
  export type RoundFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    /**
     * Filter, which Round to fetch.
     */
    where: RoundWhereUniqueInput
  }

  /**
   * Round findUniqueOrThrow
   */
  export type RoundFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    /**
     * Filter, which Round to fetch.
     */
    where: RoundWhereUniqueInput
  }

  /**
   * Round findFirst
   */
  export type RoundFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    /**
     * Filter, which Round to fetch.
     */
    where?: RoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rounds to fetch.
     */
    orderBy?: RoundOrderByWithRelationInput | RoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rounds.
     */
    cursor?: RoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rounds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rounds.
     */
    distinct?: RoundScalarFieldEnum | RoundScalarFieldEnum[]
  }

  /**
   * Round findFirstOrThrow
   */
  export type RoundFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    /**
     * Filter, which Round to fetch.
     */
    where?: RoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rounds to fetch.
     */
    orderBy?: RoundOrderByWithRelationInput | RoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rounds.
     */
    cursor?: RoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rounds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rounds.
     */
    distinct?: RoundScalarFieldEnum | RoundScalarFieldEnum[]
  }

  /**
   * Round findMany
   */
  export type RoundFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    /**
     * Filter, which Rounds to fetch.
     */
    where?: RoundWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rounds to fetch.
     */
    orderBy?: RoundOrderByWithRelationInput | RoundOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rounds.
     */
    cursor?: RoundWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rounds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rounds.
     */
    skip?: number
    distinct?: RoundScalarFieldEnum | RoundScalarFieldEnum[]
  }

  /**
   * Round create
   */
  export type RoundCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    /**
     * The data needed to create a Round.
     */
    data: XOR<RoundCreateInput, RoundUncheckedCreateInput>
  }

  /**
   * Round createMany
   */
  export type RoundCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rounds.
     */
    data: RoundCreateManyInput | RoundCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Round createManyAndReturn
   */
  export type RoundCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * The data used to create many Rounds.
     */
    data: RoundCreateManyInput | RoundCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Round update
   */
  export type RoundUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    /**
     * The data needed to update a Round.
     */
    data: XOR<RoundUpdateInput, RoundUncheckedUpdateInput>
    /**
     * Choose, which Round to update.
     */
    where: RoundWhereUniqueInput
  }

  /**
   * Round updateMany
   */
  export type RoundUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Rounds.
     */
    data: XOR<RoundUpdateManyMutationInput, RoundUncheckedUpdateManyInput>
    /**
     * Filter which Rounds to update
     */
    where?: RoundWhereInput
    /**
     * Limit how many Rounds to update.
     */
    limit?: number
  }

  /**
   * Round updateManyAndReturn
   */
  export type RoundUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * The data used to update Rounds.
     */
    data: XOR<RoundUpdateManyMutationInput, RoundUncheckedUpdateManyInput>
    /**
     * Filter which Rounds to update
     */
    where?: RoundWhereInput
    /**
     * Limit how many Rounds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Round upsert
   */
  export type RoundUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    /**
     * The filter to search for the Round to update in case it exists.
     */
    where: RoundWhereUniqueInput
    /**
     * In case the Round found by the `where` argument doesn't exist, create a new Round with this data.
     */
    create: XOR<RoundCreateInput, RoundUncheckedCreateInput>
    /**
     * In case the Round was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoundUpdateInput, RoundUncheckedUpdateInput>
  }

  /**
   * Round delete
   */
  export type RoundDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
    /**
     * Filter which Round to delete.
     */
    where: RoundWhereUniqueInput
  }

  /**
   * Round deleteMany
   */
  export type RoundDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Rounds to delete
     */
    where?: RoundWhereInput
    /**
     * Limit how many Rounds to delete.
     */
    limit?: number
  }

  /**
   * Round without action
   */
  export type RoundDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Round
     */
    select?: RoundSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Round
     */
    omit?: RoundOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoundInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageAvgAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
  }

  export type MessageSumAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
  }

  export type MessageMinAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
    content: string | null
    isCorrect: boolean | null
  }

  export type MessageMaxAggregateOutputType = {
    id: number | null
    gameId: number | null
    userId: number | null
    content: string | null
    isCorrect: boolean | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    gameId: number
    userId: number
    content: number
    isCorrect: number
    _all: number
  }


  export type MessageAvgAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
  }

  export type MessageSumAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
  }

  export type MessageMinAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    content?: true
    isCorrect?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    content?: true
    isCorrect?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    gameId?: true
    userId?: true
    content?: true
    isCorrect?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _avg?: MessageAvgAggregateInputType
    _sum?: MessageSumAggregateInputType
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: number
    gameId: number
    userId: number
    content: string
    isCorrect: boolean
    _count: MessageCountAggregateOutputType | null
    _avg: MessageAvgAggregateOutputType | null
    _sum: MessageSumAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    userId?: boolean
    content?: boolean
    isCorrect?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    userId?: boolean
    content?: boolean
    isCorrect?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean
    gameId?: boolean
    userId?: boolean
    content?: boolean
    isCorrect?: boolean
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    gameId?: boolean
    userId?: boolean
    content?: boolean
    isCorrect?: boolean
  }

  export type MessageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "gameId" | "userId" | "content" | "isCorrect", ExtArgs["result"]["message"]>

  export type $MessagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Message"
    objects: {}
    scalars: runtime.Types.Extensions.GetPayloadResult<{
      id: number
      gameId: number
      userId: number
      content: string
      isCorrect: boolean
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  export type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MessagePayload, S>

  export type MessageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends runtime.Types.Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  export interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'Int'>
    readonly gameId: FieldRef<"Message", 'Int'>
    readonly userId: FieldRef<"Message", 'Int'>
    readonly content: FieldRef<"Message", 'String'>
    readonly isCorrect: FieldRef<"Message", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  } as const)

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum = {
    id: 'id',
    username: 'username'
  } as const

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GameScalarFieldEnum = {
    id: 'id',
    status: 'status',
    maxPlayers: 'maxPlayers'
  } as const

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const GamePlayerScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    gameId: 'gameId',
    score: 'score'
  } as const

  export type GamePlayerScalarFieldEnum = (typeof GamePlayerScalarFieldEnum)[keyof typeof GamePlayerScalarFieldEnum]


  export const RoundScalarFieldEnum = {
    id: 'id',
    gameId: 'gameId',
    drawerId: 'drawerId',
    word: 'word'
  } as const

  export type RoundScalarFieldEnum = (typeof RoundScalarFieldEnum)[keyof typeof RoundScalarFieldEnum]


  export const MessageScalarFieldEnum = {
    id: 'id',
    gameId: 'gameId',
    userId: 'userId',
    content: 'content',
    isCorrect: 'isCorrect'
  } as const

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
  } as const

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
  } as const

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    games?: GamePlayerListRelationFilter
    drawnRounds?: RoundListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    games?: GamePlayerOrderByRelationAggregateInput
    drawnRounds?: RoundOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    games?: GamePlayerListRelationFilter
    drawnRounds?: RoundListRelationFilter
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: IntFilter<"Game"> | number
    status?: StringFilter<"Game"> | string
    maxPlayers?: IntFilter<"Game"> | number
    players?: GamePlayerListRelationFilter
    rounds?: RoundListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    maxPlayers?: SortOrder
    players?: GamePlayerOrderByRelationAggregateInput
    rounds?: RoundOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    status?: StringFilter<"Game"> | string
    maxPlayers?: IntFilter<"Game"> | number
    players?: GamePlayerListRelationFilter
    rounds?: RoundListRelationFilter
  }, "id">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    maxPlayers?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Game"> | number
    status?: StringWithAggregatesFilter<"Game"> | string
    maxPlayers?: IntWithAggregatesFilter<"Game"> | number
  }

  export type GamePlayerWhereInput = {
    AND?: GamePlayerWhereInput | GamePlayerWhereInput[]
    OR?: GamePlayerWhereInput[]
    NOT?: GamePlayerWhereInput | GamePlayerWhereInput[]
    id?: IntFilter<"GamePlayer"> | number
    userId?: IntFilter<"GamePlayer"> | number
    gameId?: IntFilter<"GamePlayer"> | number
    score?: IntFilter<"GamePlayer"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
  }

  export type GamePlayerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
    user?: UserOrderByWithRelationInput
    game?: GameOrderByWithRelationInput
  }

  export type GamePlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GamePlayerWhereInput | GamePlayerWhereInput[]
    OR?: GamePlayerWhereInput[]
    NOT?: GamePlayerWhereInput | GamePlayerWhereInput[]
    userId?: IntFilter<"GamePlayer"> | number
    gameId?: IntFilter<"GamePlayer"> | number
    score?: IntFilter<"GamePlayer"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
  }, "id">

  export type GamePlayerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
    _count?: GamePlayerCountOrderByAggregateInput
    _avg?: GamePlayerAvgOrderByAggregateInput
    _max?: GamePlayerMaxOrderByAggregateInput
    _min?: GamePlayerMinOrderByAggregateInput
    _sum?: GamePlayerSumOrderByAggregateInput
  }

  export type GamePlayerScalarWhereWithAggregatesInput = {
    AND?: GamePlayerScalarWhereWithAggregatesInput | GamePlayerScalarWhereWithAggregatesInput[]
    OR?: GamePlayerScalarWhereWithAggregatesInput[]
    NOT?: GamePlayerScalarWhereWithAggregatesInput | GamePlayerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GamePlayer"> | number
    userId?: IntWithAggregatesFilter<"GamePlayer"> | number
    gameId?: IntWithAggregatesFilter<"GamePlayer"> | number
    score?: IntWithAggregatesFilter<"GamePlayer"> | number
  }

  export type RoundWhereInput = {
    AND?: RoundWhereInput | RoundWhereInput[]
    OR?: RoundWhereInput[]
    NOT?: RoundWhereInput | RoundWhereInput[]
    id?: IntFilter<"Round"> | number
    gameId?: IntFilter<"Round"> | number
    drawerId?: IntFilter<"Round"> | number
    word?: StringFilter<"Round"> | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    drawer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RoundOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    drawerId?: SortOrder
    word?: SortOrder
    game?: GameOrderByWithRelationInput
    drawer?: UserOrderByWithRelationInput
  }

  export type RoundWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RoundWhereInput | RoundWhereInput[]
    OR?: RoundWhereInput[]
    NOT?: RoundWhereInput | RoundWhereInput[]
    gameId?: IntFilter<"Round"> | number
    drawerId?: IntFilter<"Round"> | number
    word?: StringFilter<"Round"> | string
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    drawer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RoundOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    drawerId?: SortOrder
    word?: SortOrder
    _count?: RoundCountOrderByAggregateInput
    _avg?: RoundAvgOrderByAggregateInput
    _max?: RoundMaxOrderByAggregateInput
    _min?: RoundMinOrderByAggregateInput
    _sum?: RoundSumOrderByAggregateInput
  }

  export type RoundScalarWhereWithAggregatesInput = {
    AND?: RoundScalarWhereWithAggregatesInput | RoundScalarWhereWithAggregatesInput[]
    OR?: RoundScalarWhereWithAggregatesInput[]
    NOT?: RoundScalarWhereWithAggregatesInput | RoundScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Round"> | number
    gameId?: IntWithAggregatesFilter<"Round"> | number
    drawerId?: IntWithAggregatesFilter<"Round"> | number
    word?: StringWithAggregatesFilter<"Round"> | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: IntFilter<"Message"> | number
    gameId?: IntFilter<"Message"> | number
    userId?: IntFilter<"Message"> | number
    content?: StringFilter<"Message"> | string
    isCorrect?: BoolFilter<"Message"> | boolean
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    isCorrect?: SortOrder
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    gameId?: IntFilter<"Message"> | number
    userId?: IntFilter<"Message"> | number
    content?: StringFilter<"Message"> | string
    isCorrect?: BoolFilter<"Message"> | boolean
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    isCorrect?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _avg?: MessageAvgOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
    _sum?: MessageSumOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Message"> | number
    gameId?: IntWithAggregatesFilter<"Message"> | number
    userId?: IntWithAggregatesFilter<"Message"> | number
    content?: StringWithAggregatesFilter<"Message"> | string
    isCorrect?: BoolWithAggregatesFilter<"Message"> | boolean
  }

  export type UserCreateInput = {
    username: string
    games?: GamePlayerCreateNestedManyWithoutUserInput
    drawnRounds?: RoundCreateNestedManyWithoutDrawerInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    games?: GamePlayerUncheckedCreateNestedManyWithoutUserInput
    drawnRounds?: RoundUncheckedCreateNestedManyWithoutDrawerInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    games?: GamePlayerUpdateManyWithoutUserNestedInput
    drawnRounds?: RoundUpdateManyWithoutDrawerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    games?: GamePlayerUncheckedUpdateManyWithoutUserNestedInput
    drawnRounds?: RoundUncheckedUpdateManyWithoutDrawerNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
  }

  export type GameCreateInput = {
    status: string
    maxPlayers: number
    players?: GamePlayerCreateNestedManyWithoutGameInput
    rounds?: RoundCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: number
    status: string
    maxPlayers: number
    players?: GamePlayerUncheckedCreateNestedManyWithoutGameInput
    rounds?: RoundUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    players?: GamePlayerUpdateManyWithoutGameNestedInput
    rounds?: RoundUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    players?: GamePlayerUncheckedUpdateManyWithoutGameNestedInput
    rounds?: RoundUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: number
    status: string
    maxPlayers: number
  }

  export type GameUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
  }

  export type GameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
  }

  export type GamePlayerCreateInput = {
    score?: number
    user: UserCreateNestedOneWithoutGamesInput
    game: GameCreateNestedOneWithoutPlayersInput
  }

  export type GamePlayerUncheckedCreateInput = {
    id?: number
    userId: number
    gameId: number
    score?: number
  }

  export type GamePlayerUpdateInput = {
    score?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutGamesNestedInput
    game?: GameUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type GamePlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type GamePlayerCreateManyInput = {
    id?: number
    userId: number
    gameId: number
    score?: number
  }

  export type GamePlayerUpdateManyMutationInput = {
    score?: IntFieldUpdateOperationsInput | number
  }

  export type GamePlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type RoundCreateInput = {
    word: string
    game: GameCreateNestedOneWithoutRoundsInput
    drawer: UserCreateNestedOneWithoutDrawnRoundsInput
  }

  export type RoundUncheckedCreateInput = {
    id?: number
    gameId: number
    drawerId: number
    word: string
  }

  export type RoundUpdateInput = {
    word?: StringFieldUpdateOperationsInput | string
    game?: GameUpdateOneRequiredWithoutRoundsNestedInput
    drawer?: UserUpdateOneRequiredWithoutDrawnRoundsNestedInput
  }

  export type RoundUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    drawerId?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
  }

  export type RoundCreateManyInput = {
    id?: number
    gameId: number
    drawerId: number
    word: string
  }

  export type RoundUpdateManyMutationInput = {
    word?: StringFieldUpdateOperationsInput | string
  }

  export type RoundUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    drawerId?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateInput = {
    gameId: number
    userId: number
    content: string
    isCorrect: boolean
  }

  export type MessageUncheckedCreateInput = {
    id?: number
    gameId: number
    userId: number
    content: string
    isCorrect: boolean
  }

  export type MessageUpdateInput = {
    gameId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageCreateManyInput = {
    id?: number
    gameId: number
    userId: number
    content: string
    isCorrect: boolean
  }

  export type MessageUpdateManyMutationInput = {
    gameId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type GamePlayerListRelationFilter = {
    every?: GamePlayerWhereInput
    some?: GamePlayerWhereInput
    none?: GamePlayerWhereInput
  }

  export type RoundListRelationFilter = {
    every?: RoundWhereInput
    some?: RoundWhereInput
    none?: RoundWhereInput
  }

  export type GamePlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoundOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    maxPlayers?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    id?: SortOrder
    maxPlayers?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    maxPlayers?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    maxPlayers?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    id?: SortOrder
    maxPlayers?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type GamePlayerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
  }

  export type GamePlayerAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
  }

  export type GamePlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
  }

  export type GamePlayerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
  }

  export type GamePlayerSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    gameId?: SortOrder
    score?: SortOrder
  }

  export type RoundCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    drawerId?: SortOrder
    word?: SortOrder
  }

  export type RoundAvgOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    drawerId?: SortOrder
  }

  export type RoundMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    drawerId?: SortOrder
    word?: SortOrder
  }

  export type RoundMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    drawerId?: SortOrder
    word?: SortOrder
  }

  export type RoundSumOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    drawerId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    isCorrect?: SortOrder
  }

  export type MessageAvgOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    isCorrect?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    isCorrect?: SortOrder
  }

  export type MessageSumOrderByAggregateInput = {
    id?: SortOrder
    gameId?: SortOrder
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GamePlayerCreateNestedManyWithoutUserInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type RoundCreateNestedManyWithoutDrawerInput = {
    create?: XOR<RoundCreateWithoutDrawerInput, RoundUncheckedCreateWithoutDrawerInput> | RoundCreateWithoutDrawerInput[] | RoundUncheckedCreateWithoutDrawerInput[]
    connectOrCreate?: RoundCreateOrConnectWithoutDrawerInput | RoundCreateOrConnectWithoutDrawerInput[]
    createMany?: RoundCreateManyDrawerInputEnvelope
    connect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
  }

  export type GamePlayerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type RoundUncheckedCreateNestedManyWithoutDrawerInput = {
    create?: XOR<RoundCreateWithoutDrawerInput, RoundUncheckedCreateWithoutDrawerInput> | RoundCreateWithoutDrawerInput[] | RoundUncheckedCreateWithoutDrawerInput[]
    connectOrCreate?: RoundCreateOrConnectWithoutDrawerInput | RoundCreateOrConnectWithoutDrawerInput[]
    createMany?: RoundCreateManyDrawerInputEnvelope
    connect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type GamePlayerUpdateManyWithoutUserNestedInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutUserInput | GamePlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutUserInput | GamePlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutUserInput | GamePlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type RoundUpdateManyWithoutDrawerNestedInput = {
    create?: XOR<RoundCreateWithoutDrawerInput, RoundUncheckedCreateWithoutDrawerInput> | RoundCreateWithoutDrawerInput[] | RoundUncheckedCreateWithoutDrawerInput[]
    connectOrCreate?: RoundCreateOrConnectWithoutDrawerInput | RoundCreateOrConnectWithoutDrawerInput[]
    upsert?: RoundUpsertWithWhereUniqueWithoutDrawerInput | RoundUpsertWithWhereUniqueWithoutDrawerInput[]
    createMany?: RoundCreateManyDrawerInputEnvelope
    set?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    disconnect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    delete?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    connect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    update?: RoundUpdateWithWhereUniqueWithoutDrawerInput | RoundUpdateWithWhereUniqueWithoutDrawerInput[]
    updateMany?: RoundUpdateManyWithWhereWithoutDrawerInput | RoundUpdateManyWithWhereWithoutDrawerInput[]
    deleteMany?: RoundScalarWhereInput | RoundScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GamePlayerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput> | GamePlayerCreateWithoutUserInput[] | GamePlayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutUserInput | GamePlayerCreateOrConnectWithoutUserInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutUserInput | GamePlayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GamePlayerCreateManyUserInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutUserInput | GamePlayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutUserInput | GamePlayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type RoundUncheckedUpdateManyWithoutDrawerNestedInput = {
    create?: XOR<RoundCreateWithoutDrawerInput, RoundUncheckedCreateWithoutDrawerInput> | RoundCreateWithoutDrawerInput[] | RoundUncheckedCreateWithoutDrawerInput[]
    connectOrCreate?: RoundCreateOrConnectWithoutDrawerInput | RoundCreateOrConnectWithoutDrawerInput[]
    upsert?: RoundUpsertWithWhereUniqueWithoutDrawerInput | RoundUpsertWithWhereUniqueWithoutDrawerInput[]
    createMany?: RoundCreateManyDrawerInputEnvelope
    set?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    disconnect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    delete?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    connect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    update?: RoundUpdateWithWhereUniqueWithoutDrawerInput | RoundUpdateWithWhereUniqueWithoutDrawerInput[]
    updateMany?: RoundUpdateManyWithWhereWithoutDrawerInput | RoundUpdateManyWithWhereWithoutDrawerInput[]
    deleteMany?: RoundScalarWhereInput | RoundScalarWhereInput[]
  }

  export type GamePlayerCreateNestedManyWithoutGameInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type RoundCreateNestedManyWithoutGameInput = {
    create?: XOR<RoundCreateWithoutGameInput, RoundUncheckedCreateWithoutGameInput> | RoundCreateWithoutGameInput[] | RoundUncheckedCreateWithoutGameInput[]
    connectOrCreate?: RoundCreateOrConnectWithoutGameInput | RoundCreateOrConnectWithoutGameInput[]
    createMany?: RoundCreateManyGameInputEnvelope
    connect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
  }

  export type GamePlayerUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
  }

  export type RoundUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<RoundCreateWithoutGameInput, RoundUncheckedCreateWithoutGameInput> | RoundCreateWithoutGameInput[] | RoundUncheckedCreateWithoutGameInput[]
    connectOrCreate?: RoundCreateOrConnectWithoutGameInput | RoundCreateOrConnectWithoutGameInput[]
    createMany?: RoundCreateManyGameInputEnvelope
    connect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
  }

  export type GamePlayerUpdateManyWithoutGameNestedInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutGameInput | GamePlayerUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutGameInput | GamePlayerUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutGameInput | GamePlayerUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type RoundUpdateManyWithoutGameNestedInput = {
    create?: XOR<RoundCreateWithoutGameInput, RoundUncheckedCreateWithoutGameInput> | RoundCreateWithoutGameInput[] | RoundUncheckedCreateWithoutGameInput[]
    connectOrCreate?: RoundCreateOrConnectWithoutGameInput | RoundCreateOrConnectWithoutGameInput[]
    upsert?: RoundUpsertWithWhereUniqueWithoutGameInput | RoundUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: RoundCreateManyGameInputEnvelope
    set?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    disconnect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    delete?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    connect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    update?: RoundUpdateWithWhereUniqueWithoutGameInput | RoundUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: RoundUpdateManyWithWhereWithoutGameInput | RoundUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: RoundScalarWhereInput | RoundScalarWhereInput[]
  }

  export type GamePlayerUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput> | GamePlayerCreateWithoutGameInput[] | GamePlayerUncheckedCreateWithoutGameInput[]
    connectOrCreate?: GamePlayerCreateOrConnectWithoutGameInput | GamePlayerCreateOrConnectWithoutGameInput[]
    upsert?: GamePlayerUpsertWithWhereUniqueWithoutGameInput | GamePlayerUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: GamePlayerCreateManyGameInputEnvelope
    set?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    disconnect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    delete?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    connect?: GamePlayerWhereUniqueInput | GamePlayerWhereUniqueInput[]
    update?: GamePlayerUpdateWithWhereUniqueWithoutGameInput | GamePlayerUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: GamePlayerUpdateManyWithWhereWithoutGameInput | GamePlayerUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
  }

  export type RoundUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<RoundCreateWithoutGameInput, RoundUncheckedCreateWithoutGameInput> | RoundCreateWithoutGameInput[] | RoundUncheckedCreateWithoutGameInput[]
    connectOrCreate?: RoundCreateOrConnectWithoutGameInput | RoundCreateOrConnectWithoutGameInput[]
    upsert?: RoundUpsertWithWhereUniqueWithoutGameInput | RoundUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: RoundCreateManyGameInputEnvelope
    set?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    disconnect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    delete?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    connect?: RoundWhereUniqueInput | RoundWhereUniqueInput[]
    update?: RoundUpdateWithWhereUniqueWithoutGameInput | RoundUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: RoundUpdateManyWithWhereWithoutGameInput | RoundUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: RoundScalarWhereInput | RoundScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGamesInput = {
    create?: XOR<UserCreateWithoutGamesInput, UserUncheckedCreateWithoutGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesInput
    connect?: UserWhereUniqueInput
  }

  export type GameCreateNestedOneWithoutPlayersInput = {
    create?: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: GameCreateOrConnectWithoutPlayersInput
    connect?: GameWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGamesNestedInput = {
    create?: XOR<UserCreateWithoutGamesInput, UserUncheckedCreateWithoutGamesInput>
    connectOrCreate?: UserCreateOrConnectWithoutGamesInput
    upsert?: UserUpsertWithoutGamesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGamesInput, UserUpdateWithoutGamesInput>, UserUncheckedUpdateWithoutGamesInput>
  }

  export type GameUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: GameCreateOrConnectWithoutPlayersInput
    upsert?: GameUpsertWithoutPlayersInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutPlayersInput, GameUpdateWithoutPlayersInput>, GameUncheckedUpdateWithoutPlayersInput>
  }

  export type GameCreateNestedOneWithoutRoundsInput = {
    create?: XOR<GameCreateWithoutRoundsInput, GameUncheckedCreateWithoutRoundsInput>
    connectOrCreate?: GameCreateOrConnectWithoutRoundsInput
    connect?: GameWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDrawnRoundsInput = {
    create?: XOR<UserCreateWithoutDrawnRoundsInput, UserUncheckedCreateWithoutDrawnRoundsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDrawnRoundsInput
    connect?: UserWhereUniqueInput
  }

  export type GameUpdateOneRequiredWithoutRoundsNestedInput = {
    create?: XOR<GameCreateWithoutRoundsInput, GameUncheckedCreateWithoutRoundsInput>
    connectOrCreate?: GameCreateOrConnectWithoutRoundsInput
    upsert?: GameUpsertWithoutRoundsInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutRoundsInput, GameUpdateWithoutRoundsInput>, GameUncheckedUpdateWithoutRoundsInput>
  }

  export type UserUpdateOneRequiredWithoutDrawnRoundsNestedInput = {
    create?: XOR<UserCreateWithoutDrawnRoundsInput, UserUncheckedCreateWithoutDrawnRoundsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDrawnRoundsInput
    upsert?: UserUpsertWithoutDrawnRoundsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDrawnRoundsInput, UserUpdateWithoutDrawnRoundsInput>, UserUncheckedUpdateWithoutDrawnRoundsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GamePlayerCreateWithoutUserInput = {
    score?: number
    game: GameCreateNestedOneWithoutPlayersInput
  }

  export type GamePlayerUncheckedCreateWithoutUserInput = {
    id?: number
    gameId: number
    score?: number
  }

  export type GamePlayerCreateOrConnectWithoutUserInput = {
    where: GamePlayerWhereUniqueInput
    create: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput>
  }

  export type GamePlayerCreateManyUserInputEnvelope = {
    data: GamePlayerCreateManyUserInput | GamePlayerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoundCreateWithoutDrawerInput = {
    word: string
    game: GameCreateNestedOneWithoutRoundsInput
  }

  export type RoundUncheckedCreateWithoutDrawerInput = {
    id?: number
    gameId: number
    word: string
  }

  export type RoundCreateOrConnectWithoutDrawerInput = {
    where: RoundWhereUniqueInput
    create: XOR<RoundCreateWithoutDrawerInput, RoundUncheckedCreateWithoutDrawerInput>
  }

  export type RoundCreateManyDrawerInputEnvelope = {
    data: RoundCreateManyDrawerInput | RoundCreateManyDrawerInput[]
    skipDuplicates?: boolean
  }

  export type GamePlayerUpsertWithWhereUniqueWithoutUserInput = {
    where: GamePlayerWhereUniqueInput
    update: XOR<GamePlayerUpdateWithoutUserInput, GamePlayerUncheckedUpdateWithoutUserInput>
    create: XOR<GamePlayerCreateWithoutUserInput, GamePlayerUncheckedCreateWithoutUserInput>
  }

  export type GamePlayerUpdateWithWhereUniqueWithoutUserInput = {
    where: GamePlayerWhereUniqueInput
    data: XOR<GamePlayerUpdateWithoutUserInput, GamePlayerUncheckedUpdateWithoutUserInput>
  }

  export type GamePlayerUpdateManyWithWhereWithoutUserInput = {
    where: GamePlayerScalarWhereInput
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyWithoutUserInput>
  }

  export type GamePlayerScalarWhereInput = {
    AND?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
    OR?: GamePlayerScalarWhereInput[]
    NOT?: GamePlayerScalarWhereInput | GamePlayerScalarWhereInput[]
    id?: IntFilter<"GamePlayer"> | number
    userId?: IntFilter<"GamePlayer"> | number
    gameId?: IntFilter<"GamePlayer"> | number
    score?: IntFilter<"GamePlayer"> | number
  }

  export type RoundUpsertWithWhereUniqueWithoutDrawerInput = {
    where: RoundWhereUniqueInput
    update: XOR<RoundUpdateWithoutDrawerInput, RoundUncheckedUpdateWithoutDrawerInput>
    create: XOR<RoundCreateWithoutDrawerInput, RoundUncheckedCreateWithoutDrawerInput>
  }

  export type RoundUpdateWithWhereUniqueWithoutDrawerInput = {
    where: RoundWhereUniqueInput
    data: XOR<RoundUpdateWithoutDrawerInput, RoundUncheckedUpdateWithoutDrawerInput>
  }

  export type RoundUpdateManyWithWhereWithoutDrawerInput = {
    where: RoundScalarWhereInput
    data: XOR<RoundUpdateManyMutationInput, RoundUncheckedUpdateManyWithoutDrawerInput>
  }

  export type RoundScalarWhereInput = {
    AND?: RoundScalarWhereInput | RoundScalarWhereInput[]
    OR?: RoundScalarWhereInput[]
    NOT?: RoundScalarWhereInput | RoundScalarWhereInput[]
    id?: IntFilter<"Round"> | number
    gameId?: IntFilter<"Round"> | number
    drawerId?: IntFilter<"Round"> | number
    word?: StringFilter<"Round"> | string
  }

  export type GamePlayerCreateWithoutGameInput = {
    score?: number
    user: UserCreateNestedOneWithoutGamesInput
  }

  export type GamePlayerUncheckedCreateWithoutGameInput = {
    id?: number
    userId: number
    score?: number
  }

  export type GamePlayerCreateOrConnectWithoutGameInput = {
    where: GamePlayerWhereUniqueInput
    create: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput>
  }

  export type GamePlayerCreateManyGameInputEnvelope = {
    data: GamePlayerCreateManyGameInput | GamePlayerCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type RoundCreateWithoutGameInput = {
    word: string
    drawer: UserCreateNestedOneWithoutDrawnRoundsInput
  }

  export type RoundUncheckedCreateWithoutGameInput = {
    id?: number
    drawerId: number
    word: string
  }

  export type RoundCreateOrConnectWithoutGameInput = {
    where: RoundWhereUniqueInput
    create: XOR<RoundCreateWithoutGameInput, RoundUncheckedCreateWithoutGameInput>
  }

  export type RoundCreateManyGameInputEnvelope = {
    data: RoundCreateManyGameInput | RoundCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type GamePlayerUpsertWithWhereUniqueWithoutGameInput = {
    where: GamePlayerWhereUniqueInput
    update: XOR<GamePlayerUpdateWithoutGameInput, GamePlayerUncheckedUpdateWithoutGameInput>
    create: XOR<GamePlayerCreateWithoutGameInput, GamePlayerUncheckedCreateWithoutGameInput>
  }

  export type GamePlayerUpdateWithWhereUniqueWithoutGameInput = {
    where: GamePlayerWhereUniqueInput
    data: XOR<GamePlayerUpdateWithoutGameInput, GamePlayerUncheckedUpdateWithoutGameInput>
  }

  export type GamePlayerUpdateManyWithWhereWithoutGameInput = {
    where: GamePlayerScalarWhereInput
    data: XOR<GamePlayerUpdateManyMutationInput, GamePlayerUncheckedUpdateManyWithoutGameInput>
  }

  export type RoundUpsertWithWhereUniqueWithoutGameInput = {
    where: RoundWhereUniqueInput
    update: XOR<RoundUpdateWithoutGameInput, RoundUncheckedUpdateWithoutGameInput>
    create: XOR<RoundCreateWithoutGameInput, RoundUncheckedCreateWithoutGameInput>
  }

  export type RoundUpdateWithWhereUniqueWithoutGameInput = {
    where: RoundWhereUniqueInput
    data: XOR<RoundUpdateWithoutGameInput, RoundUncheckedUpdateWithoutGameInput>
  }

  export type RoundUpdateManyWithWhereWithoutGameInput = {
    where: RoundScalarWhereInput
    data: XOR<RoundUpdateManyMutationInput, RoundUncheckedUpdateManyWithoutGameInput>
  }

  export type UserCreateWithoutGamesInput = {
    username: string
    drawnRounds?: RoundCreateNestedManyWithoutDrawerInput
  }

  export type UserUncheckedCreateWithoutGamesInput = {
    id?: number
    username: string
    drawnRounds?: RoundUncheckedCreateNestedManyWithoutDrawerInput
  }

  export type UserCreateOrConnectWithoutGamesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGamesInput, UserUncheckedCreateWithoutGamesInput>
  }

  export type GameCreateWithoutPlayersInput = {
    status: string
    maxPlayers: number
    rounds?: RoundCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutPlayersInput = {
    id?: number
    status: string
    maxPlayers: number
    rounds?: RoundUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutPlayersInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
  }

  export type UserUpsertWithoutGamesInput = {
    update: XOR<UserUpdateWithoutGamesInput, UserUncheckedUpdateWithoutGamesInput>
    create: XOR<UserCreateWithoutGamesInput, UserUncheckedCreateWithoutGamesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGamesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGamesInput, UserUncheckedUpdateWithoutGamesInput>
  }

  export type UserUpdateWithoutGamesInput = {
    username?: StringFieldUpdateOperationsInput | string
    drawnRounds?: RoundUpdateManyWithoutDrawerNestedInput
  }

  export type UserUncheckedUpdateWithoutGamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    drawnRounds?: RoundUncheckedUpdateManyWithoutDrawerNestedInput
  }

  export type GameUpsertWithoutPlayersInput = {
    update: XOR<GameUpdateWithoutPlayersInput, GameUncheckedUpdateWithoutPlayersInput>
    create: XOR<GameCreateWithoutPlayersInput, GameUncheckedCreateWithoutPlayersInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutPlayersInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutPlayersInput, GameUncheckedUpdateWithoutPlayersInput>
  }

  export type GameUpdateWithoutPlayersInput = {
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    rounds?: RoundUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutPlayersInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    rounds?: RoundUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateWithoutRoundsInput = {
    status: string
    maxPlayers: number
    players?: GamePlayerCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateWithoutRoundsInput = {
    id?: number
    status: string
    maxPlayers: number
    players?: GamePlayerUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameCreateOrConnectWithoutRoundsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutRoundsInput, GameUncheckedCreateWithoutRoundsInput>
  }

  export type UserCreateWithoutDrawnRoundsInput = {
    username: string
    games?: GamePlayerCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDrawnRoundsInput = {
    id?: number
    username: string
    games?: GamePlayerUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDrawnRoundsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDrawnRoundsInput, UserUncheckedCreateWithoutDrawnRoundsInput>
  }

  export type GameUpsertWithoutRoundsInput = {
    update: XOR<GameUpdateWithoutRoundsInput, GameUncheckedUpdateWithoutRoundsInput>
    create: XOR<GameCreateWithoutRoundsInput, GameUncheckedCreateWithoutRoundsInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutRoundsInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutRoundsInput, GameUncheckedUpdateWithoutRoundsInput>
  }

  export type GameUpdateWithoutRoundsInput = {
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    players?: GamePlayerUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateWithoutRoundsInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    maxPlayers?: IntFieldUpdateOperationsInput | number
    players?: GamePlayerUncheckedUpdateManyWithoutGameNestedInput
  }

  export type UserUpsertWithoutDrawnRoundsInput = {
    update: XOR<UserUpdateWithoutDrawnRoundsInput, UserUncheckedUpdateWithoutDrawnRoundsInput>
    create: XOR<UserCreateWithoutDrawnRoundsInput, UserUncheckedCreateWithoutDrawnRoundsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDrawnRoundsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDrawnRoundsInput, UserUncheckedUpdateWithoutDrawnRoundsInput>
  }

  export type UserUpdateWithoutDrawnRoundsInput = {
    username?: StringFieldUpdateOperationsInput | string
    games?: GamePlayerUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDrawnRoundsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    games?: GamePlayerUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GamePlayerCreateManyUserInput = {
    id?: number
    gameId: number
    score?: number
  }

  export type RoundCreateManyDrawerInput = {
    id?: number
    gameId: number
    word: string
  }

  export type GamePlayerUpdateWithoutUserInput = {
    score?: IntFieldUpdateOperationsInput | number
    game?: GameUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type GamePlayerUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type GamePlayerUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type RoundUpdateWithoutDrawerInput = {
    word?: StringFieldUpdateOperationsInput | string
    game?: GameUpdateOneRequiredWithoutRoundsNestedInput
  }

  export type RoundUncheckedUpdateWithoutDrawerInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
  }

  export type RoundUncheckedUpdateManyWithoutDrawerInput = {
    id?: IntFieldUpdateOperationsInput | number
    gameId?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
  }

  export type GamePlayerCreateManyGameInput = {
    id?: number
    userId: number
    score?: number
  }

  export type RoundCreateManyGameInput = {
    id?: number
    drawerId: number
    word: string
  }

  export type GamePlayerUpdateWithoutGameInput = {
    score?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutGamesNestedInput
  }

  export type GamePlayerUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type GamePlayerUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type RoundUpdateWithoutGameInput = {
    word?: StringFieldUpdateOperationsInput | string
    drawer?: UserUpdateOneRequiredWithoutDrawnRoundsNestedInput
  }

  export type RoundUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    drawerId?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
  }

  export type RoundUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    drawerId?: IntFieldUpdateOperationsInput | number
    word?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }
}