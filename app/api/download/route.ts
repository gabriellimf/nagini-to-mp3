import { stat, createWriteStream } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import { join } from 'path';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(url);
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '-');
    const filePath = join(process.cwd(), 'public', `${title}.mp3`);
    const writer = createWriteStream(filePath);

    await new Promise((resolve, reject) => {
      ytdl.downloadFromInfo(info, { format: audioFormats[0] })
        .pipe(writer)
        .on('finish', resolve)
        .on('error', reject);
    });

    const fileUrl = `/${title}.mp3`;
    console.log(fileUrl);
    return NextResponse.json({ filePath: fileUrl })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}