import mongoose, { Schema, model, models } from 'mongoose'

const AdminSchema = new Schema(
  {
    email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ['admin'], default: 'admin' },
  },
  { timestamps: true }
)

const Admin = models.Admin ?? model('Admin', AdminSchema)
export default Admin
