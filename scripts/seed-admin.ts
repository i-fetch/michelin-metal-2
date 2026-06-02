// scripts/seed-admin.ts
import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt   from 'bcryptjs'
import { User } from '@/models/User';

const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1) }

const UserSchema = new mongoose.Schema({
  username:     String,
  email:    { type: String, unique: true },
  password: String,
  role:     { type: String, default: 'admin' },
})

// Safe model registration for scripts (no module caching)
const Admin = mongoose.model('Admin', UserSchema)

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  const email    = 'admin@mechelinmetals.com'
  const password = 'Admin1234!'          // ← change after first login!
  const hashed   = await bcrypt.hash(password, 12)

  await User.findOneAndUpdate(
    { email },
    { username: 'Mechelin Admin', email, password: hashed, role: 'admin' },
    { upsert: true, new: true }
  )

  console.log(`✅ Admin seeded:`)
  console.log(`   Email:    ${email}`)
  console.log(`   Password: ${password}`)
  console.log(`   ⚠️  Change this password immediately after first login!`)
  await mongoose.disconnect()
}

seed().catch(e => { console.error(e); process.exit(1) })
