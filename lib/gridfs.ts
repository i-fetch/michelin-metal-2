// lib/gridfs.ts
import { Readable, pipeline as pipelineCallback } from 'stream'
import { promisify } from 'util'
import sharp from 'sharp'
import { ObjectId, GridFSBucket } from 'mongodb'
import { connectDB } from '@/lib/mongodb'
import mongoose from 'mongoose'

const pipeline = promisify(pipelineCallback)

export async function getGridFSBucket(): Promise<GridFSBucket> {
  await connectDB()
  // Access the underlying native MongoDB db from the mongoose connection
  const db = mongoose.connection.db
  if (!db) throw new Error('MongoDB connection not ready')
  return new GridFSBucket(db, { bucketName: 'images' })
}

function toNodeReadable(stream: ReadableStream<Uint8Array>): Readable {
  return Readable.fromWeb(stream as any)
}

export async function uploadImageToGridFS(file: File): Promise<string> {
  const bucket   = await getGridFSBucket()
  const fileId   = new ObjectId()
  const uploadStream = bucket.openUploadStreamWithId(
    fileId,
    `product-${Date.now()}.webp`,
    {
      contentType: 'image/webp',
      metadata: {
        originalName: file.name,
        size:         file.size,
        createdAt:    new Date(),
      },
    }
  )

  const transformer = sharp()
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })

  await pipeline(toNodeReadable(file.stream()), transformer, uploadStream)
  return fileId.toString()
}

export async function deleteImageFromGridFS(id: string): Promise<void> {
  try {
    const bucket = await getGridFSBucket()
    await bucket.delete(new ObjectId(id))
  } catch (err) {
    console.warn('[deleteImageFromGridFS] could not delete', id, err)
  }
}
