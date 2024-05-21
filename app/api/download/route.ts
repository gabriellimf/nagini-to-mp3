import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    const filePath = path.resolve(process.cwd(), 'public', `${videoTitle}.mp3`);
    const publicPath = path.join('/', `${videoTitle}.mp3`);

    console.log(`Saving MP3 to: ${filePath}`); // Adicionando log

    await new Promise((resolve, reject) => {
      const stream = ytdl(url, { quality: 'highestaudio' });

      ffmpeg(stream)
        .audioBitrate(128)
        .save(filePath)
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`File saved, serving from: ${publicPath}`); // Adicionando log

    return NextResponse.json({ filePath: publicPath });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}