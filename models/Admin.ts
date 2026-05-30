// models/Admin.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface IAdmin extends Document {
  name:     string
  email:    string
  password: string
  role:     'admin'
}

const UserSchema = new Schema<IAdmin>(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role:     { type: String, default: 'admin', enum: ['admin'] },
  },
  { timestamps: true }
)

// Safe pattern — avoids "Cannot read properties of undefined (reading 'Admin')"
// by calling connectDB first so mongoose is initialised before model registration
let AdminModel: mongoose.Model<IAdmin>

try {
  AdminModel = mongoose.model<IAdmin>('Admin')
} catch {
  AdminModel = mongoose.model<IAdmin>('Admin', UserSchema)
}

export { AdminModel }
