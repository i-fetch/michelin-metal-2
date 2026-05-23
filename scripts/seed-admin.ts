// scripts/seed-admin.ts
import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt   from 'bcryptjs'

const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1) }

const AdminSchema = new mongoose.Schema({
  name:     String,
  email:    { type: String, unique: true },
  password: String,
  role:     { type: String, default: 'admin' },
})

// Safe model registration for scripts (no module caching)
const Admin = mongoose.model('Admin', AdminSchema)

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  const email    = 'admin@mechelinmetals.com'
  const password = 'Admin1234!'          // ← change after first login!
  const hashed   = await bcrypt.hash(password, 12)

  await Admin.findOneAndUpdate(
    { email },
    { name: 'Mechelin Admin', email, password: hashed, role: 'admin' },
    { upsert: true, new: true }
  )

  console.log(`✅ Admin seeded:`)
  console.log(`   Email:    ${email}`)
  console.log(`   Password: ${password}`)
  console.log(`   ⚠️  Change this password immediately after first login!`)
  await mongoose.disconnect()
}

seed().catch(e => { console.error(e); process.exit(1) })
