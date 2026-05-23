// app/api/images/[id]/route.ts
import { Readable }       from 'stream'
import { GridFSBucket, ObjectId } from 'mongodb'
import mongoose           from 'mongoose'
import { connectDB }      from '@/lib/mongodb'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  let fileId: ObjectId
  try {
    fileId = new ObjectId(id)
  } catch {
    return new Response('Invalid image ID', { status: 400 })
  }

  try {
    await connectDB()
    const db = mongoose.connection.db
    if (!db) return new Response('DB not ready', { status: 503 })

    const bucket   = new GridFSBucket(db, { bucketName: 'images' })
    const fileInfo = await bucket.find({ _id: fileId }).next()

    if (!fileInfo) {
      return new Response('Image not found', { status: 404 })
    }

    const downloadStream = bucket.openDownloadStream(fileId)
    const readable = Readable.toWeb(downloadStream) as unknown as ReadableStream<Uint8Array>

    return new Response(readable, {
      headers: {
        'Content-Type':  fileInfo.contentType ?? 'image/webp',
        'Cache-Control': 'public, max-age=31536000, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('[GET /api/images]', err)
    return new Response('Internal server error', { status: 500 })
  }
}
