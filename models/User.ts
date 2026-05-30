// models/User.ts

import mongoose, { Schema, Document, Model } from "mongoose"


export type UserRole = "admin"

export interface IUser extends Document {
    username: string
    email: string
    password: string
    role: UserRole
    createdAt: Date
    updatedAt: Date
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            minlength: 3,
            maxlength: 30,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            select: false, // hide password by default
        },
        role: {
            type: String,
            enum: ["admin"],
            default: "admin",
        },
    },
    {
        timestamps: true,
    }
)

export const User: Model<IUser> =
    mongoose.models.User ||
    mongoose.model<IUser>("User", UserSchema)