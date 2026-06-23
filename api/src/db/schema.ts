import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

// Enums
export const friendshipStatusEnum = pgEnum('friendship_status', ['pending', 'accepted', 'rejected'])
export const gameStatusEnum = pgEnum('game_status', ['waiting', 'drawing', 'in_progress', 'finished'])

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  avatar: text('avatar'), // base64 encoded image or data URL
  bio: varchar('bio', { length: 140 }),
  twoFactorEnabled: boolean('two_factor_enabled').default(false).notNull(),
  twoFactorSecret: varchar('two_factor_secret', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Friendships table
export const friendships = pgTable('friendships', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  friendId: uuid('friend_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: friendshipStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Private messages table (only between friends)
export const privateMessages = pgTable('private_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  senderId: uuid('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  receiverId: uuid('receiver_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Games table
export const games = pgTable('games', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code'),
  status: gameStatusEnum('status').notNull().default('waiting'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  finishedAt: timestamp('finished_at'),
  environment: text('environment'),
})

// Game players junction table
export const gamePlayers = pgTable('game_players', {
  id: uuid('id').primaryKey().defaultRandom(),
  gameId: uuid('game_id').notNull().references(() => games.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  score: integer('score').default(0),
  isWinner: boolean('is_winner'),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
})

// Weapon drawings table — one drawing per player per game
export const weaponDrawings = pgTable('weapon_drawings', {
  id: uuid('id').primaryKey().defaultRandom(),
  gameId: uuid('game_id').notNull().references(() => games.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  drawingData: text('drawing_data').notNull(), // base64 encoded image
  aiGuessedWeapon: varchar('ai_guessed_weapon', { length: 100 }),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
})

// Game stories table — AI-generated story and winner per game
export const gameStories = pgTable('game_stories', {
  id: uuid('id').primaryKey().defaultRandom(),
  gameId: uuid('game_id').notNull().references(() => games.id, { onDelete: 'cascade' }).unique(),
  story: text('story').notNull(),
  winnerId: uuid('winner_id').references(() => users.id, { onDelete: 'set null' }),
  generatedAt: timestamp('generated_at').defaultNow().notNull(),
})

// Game messages table (group chat, only game players can post)
export const gameMessages = pgTable('game_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  gameId: uuid('game_id').notNull().references(() => games.id, { onDelete: 'cascade' }),
  senderId: uuid('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  sentPrivateMessages: many(privateMessages, { relationName: 'sender' }),
  receivedPrivateMessages: many(privateMessages, { relationName: 'receiver' }),
  sentGameMessages: many(gameMessages),
  friendshipsInitiated: many(friendships, { relationName: 'user' }),
  friendshipsReceived: many(friendships, { relationName: 'friend' }),
  gamePlayers: many(gamePlayers),
  weaponDrawings: many(weaponDrawings),
}))

export const friendshipsRelations = relations(friendships, ({ one }) => ({
  user: one(users, { fields: [friendships.userId], references: [users.id], relationName: 'user' }),
  friend: one(users, { fields: [friendships.friendId], references: [users.id], relationName: 'friend' }),
}))

export const privateMessagesRelations = relations(privateMessages, ({ one }) => ({
  sender: one(users, { fields: [privateMessages.senderId], references: [users.id], relationName: 'sender' }),
  receiver: one(users, { fields: [privateMessages.receiverId], references: [users.id], relationName: 'receiver' }),
}))

export const gamesRelations = relations(games, ({ many, one }) => ({
  gamePlayers: many(gamePlayers),
  gameMessages: many(gameMessages),
  weaponDrawings: many(weaponDrawings),
  story: one(gameStories),
}))

export const gamePlayersRelations = relations(gamePlayers, ({ one }) => ({
  game: one(games, { fields: [gamePlayers.gameId], references: [games.id] }),
  user: one(users, { fields: [gamePlayers.userId], references: [users.id] }),
}))

export const weaponDrawingsRelations = relations(weaponDrawings, ({ one }) => ({
  game: one(games, { fields: [weaponDrawings.gameId], references: [games.id] }),
  user: one(users, { fields: [weaponDrawings.userId], references: [users.id] }),
}))

export const gameStoriesRelations = relations(gameStories, ({ one }) => ({
  game: one(games, { fields: [gameStories.gameId], references: [games.id] }),
  winner: one(users, { fields: [gameStories.winnerId], references: [users.id] }),
}))

export const gameMessagesRelations = relations(gameMessages, ({ one }) => ({
  game: one(games, { fields: [gameMessages.gameId], references: [games.id] }),
  sender: one(users, { fields: [gameMessages.senderId], references: [users.id] }),
}))

// Zod schemas
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
export const insertPrivateMessageSchema = createInsertSchema(privateMessages)
export const selectPrivateMessageSchema = createSelectSchema(privateMessages)
export const insertFriendshipSchema = createInsertSchema(friendships)
export const selectFriendshipSchema = createSelectSchema(friendships)
export const insertGameSchema = createInsertSchema(games)
export const selectGameSchema = createSelectSchema(games)
export const insertGamePlayerSchema = createInsertSchema(gamePlayers)
export const selectGamePlayerSchema = createSelectSchema(gamePlayers)
export const insertWeaponDrawingSchema = createInsertSchema(weaponDrawings)
export const selectWeaponDrawingSchema = createSelectSchema(weaponDrawings)
export const insertGameStorySchema = createInsertSchema(gameStories)
export const selectGameStorySchema = createSelectSchema(gameStories)
export const insertGameMessageSchema = createInsertSchema(gameMessages)
export const selectGameMessageSchema = createSelectSchema(gameMessages)

// Type exports
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type PrivateMessage = typeof privateMessages.$inferSelect
export type NewPrivateMessage = typeof privateMessages.$inferInsert
export type Friendship = typeof friendships.$inferSelect
export type NewFriendship = typeof friendships.$inferInsert
export type Game = typeof games.$inferSelect
export type NewGame = typeof games.$inferInsert
export type GamePlayer = typeof gamePlayers.$inferSelect
export type NewGamePlayer = typeof gamePlayers.$inferInsert
export type WeaponDrawing = typeof weaponDrawings.$inferSelect
export type NewWeaponDrawing = typeof weaponDrawings.$inferInsert
export type GameStory = typeof gameStories.$inferSelect
export type NewGameStory = typeof gameStories.$inferInsert
export type GameMessage = typeof gameMessages.$inferSelect
export type NewGameMessage = typeof gameMessages.$inferInsert
