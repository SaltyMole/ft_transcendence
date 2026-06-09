import { db } from './connection.ts'
import { users, friendships, privateMessages, games, gamePlayers, gameMessages } from './schema.ts'
import { hashPassword } from '../utils/password.ts'

async function seed() {
  console.log('🌱 Starting database seed...')

  try {
    // Clear existing data (order matters for FK constraints)
    console.log('Clearing existing data...')
    await db.delete(gameMessages)
    await db.delete(gamePlayers)
    await db.delete(games)
    await db.delete(privateMessages)
    await db.delete(friendships)
    await db.delete(users)

    // Create users
    console.log('Creating users...')
    const hashedPassword = await hashPassword('demo123')

    const [pauline] = await db
      .insert(users)
      .values({
        email: 'pauline@transcendance.com',
        username: 'pauline',
        password: hashedPassword,
      })
      .returning()

    const [paul] = await db
      .insert(users)
      .values({
        email: 'paul@transcendance.com',
        username: 'paul',
        password: hashedPassword,
      })
      .returning()

    const [nathan] = await db
      .insert(users)
      .values({
        email: 'nathan@transcendance.com',
        username: 'Nathan',
        password: hashedPassword,
      })
      .returning()

    const [lucas] = await db
      .insert(users)
      .values({
        email: 'lucas@transcendance.com',
        username: 'lucas',
        password: hashedPassword,
      })
      .returning()

    // Create friendships
    console.log('Creating friendships...')
    await db.insert(friendships).values([
      { userId: pauline.id, friendId: nathan.id, status: 'accepted' },
      { userId: pauline.id, friendId: paul.id, status: 'accepted' },
      { userId: nathan.id, friendId: lucas.id, status: 'accepted' },
      { userId: paul.id, friendId: lucas.id, status: 'pending' },
    ])

    // Create private messages (only between accepted friends)
    console.log('Creating private messages...')
    await db.insert(privateMessages).values([
      { senderId: pauline.id, receiverId: nathan.id, content: 'Salut nathan, prêt pour une partie ?' },
      { senderId: nathan.id, receiverId: pauline.id, content: 'Oui ! Je t\'attends en ligne.' },
      { senderId: pauline.id, receiverId: nathan.id, content: 'Top, je lance une partie.' },
      { senderId: pauline.id, receiverId: paul.id, content: 'paul, t\'es là ?' },
      { senderId: paul.id, receiverId: pauline.id, content: 'Oui, qu\'est-ce qui se passe ?' },
      { senderId: nathan.id, receiverId: lucas.id, content: 'Bien joué ce soir lucas !' },
      { senderId: lucas.id, receiverId: nathan.id, content: 'Merci, t\'es pas mal non plus haha' },
    ])

    // Create games
    console.log('Creating games...')
    const [finishedGame] = await db
      .insert(games)
      .values({ status: 'finished', finishedAt: new Date() })
      .returning()

    const [inProgressGame] = await db
      .insert(games)
      .values({ status: 'in_progress' })
      .returning()

    const [waitingGame] = await db
      .insert(games)
      .values({ status: 'waiting' })
      .returning()

    // Add players to games
    console.log('Adding game players...')
    await db.insert(gamePlayers).values([
      { gameId: finishedGame.id, userId: pauline.id, score: 11 },
      { gameId: finishedGame.id, userId: nathan.id, score: 7 },
      { gameId: inProgressGame.id, userId: paul.id, score: 3 },
      { gameId: inProgressGame.id, userId: lucas.id, score: 5 },
      { gameId: waitingGame.id, userId: pauline.id, score: 0 },
    ])

    // Create game messages
    console.log('Creating game messages...')
    await db.insert(gameMessages).values([
      { gameId: finishedGame.id, senderId: pauline.id, content: 'Bonne chance !' },
      { gameId: finishedGame.id, senderId: nathan.id, content: 'À toi aussi !' },
      { gameId: finishedGame.id, senderId: pauline.id, content: 'GG !' },
      { gameId: inProgressGame.id, senderId: paul.id, content: 'Allez on y va !' },
      { gameId: inProgressGame.id, senderId: lucas.id, content: 'Je vais gagner cette fois 😤' },
    ])

    console.log('✅ Database seeded successfully!')
    console.log('\n📊 Seed Summary:')
    console.log('- 4 users created')
    console.log('- 4 friendships (3 accepted, 1 pending)')
    console.log('- 7 private messages')
    console.log('- 3 games (1 finished, 1 in progress, 1 waiting)')
    console.log('- 5 game players')
    console.log('- 5 game messages')
    console.log('\n🔑 Login Credentials (password: demo123):')
    console.log('- pauline@transcendance.com')
    console.log('- nathan@transcendance.com')
    console.log('- paul@transcendance.com')
    console.log('- lucas@transcendance.com')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export default seed
