/**
 * Run: npx tsx scripts/seed-admin.ts
 * Creates the initial admin user in MongoDB.
 */
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const MONGODB_URI = process.env.MONGODB_URI!
if (!MONGODB_URI) throw new Error('Set MONGODB_URI in .env.local')

const AdminSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, default: 'admin' },
}, { timestamps: true })

const Admin = mongoose.models.Admin ?? mongoose.model('Admin', AdminSchema)

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  const email    = process.env.ADMIN_EMAIL    ?? 'admin@mechelinmetals.com'
  const password = process.env.ADMIN_PASSWORD ?? 'Admin@1234'

  const existing = await Admin.findOne({ email })
  if (existing) {
    console.log(`Admin already exists: ${email}`)
    process.exit(0)
  }

  const hashed = await bcrypt.hash(password, 12)
  await Admin.create({ email, password: hashed, role: 'admin' })

  console.log(`✅ Admin created: ${email}`)
  await mongoose.disconnect()
}

seed().catch((e) => { console.error(e); process.exit(1) })
