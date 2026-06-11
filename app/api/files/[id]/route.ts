import { Readable } from 'stream';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) return new NextResponse('Missing id', { status: 400 });

  const mongoose = await connectDB();
  const db = mongoose.connection.db;
  if (!db) {
    return new NextResponse('Database not available', { status: 500 });
  }

  const { ObjectId } = await import('mongodb');
  const bucket = new mongoose.mongo.GridFSBucket(db);

  let fileDoc;
  try {
    fileDoc = await db.collection('fs.files').findOne({ _id: new ObjectId(id) });
  } catch (err) {
    return new NextResponse('Invalid id', { status: 400 });
  }

  if (!fileDoc) return new NextResponse('Not found', { status: 404 });

  const downloadStream = bucket.openDownloadStream(new ObjectId(id));
  const stream = new Readable().wrap(downloadStream as any);

  const headers: Record<string, string> = {
    'Content-Type': fileDoc.contentType || 'application/octet-stream',
    'Content-Disposition': `inline; filename="${fileDoc.filename || 'file'}"`,
  };

  return new NextResponse(stream as unknown as BodyInit, { status: 200, headers });
}
