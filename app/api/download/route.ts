import { NextRequest } from "next/server";
import ytdl from "ytdl-core";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const url = requestUrl.searchParams.get('url') || '';

  if (!ytdl.validateURL(url)) {
    return new Response(JSON.stringify({ message: 'Invalid URL' }), { status: 400 });
  }

  const info = await ytdl.getInfo(url);
  const validateURL = ytdl.validateURL(url);
  const title = info.videoDetails.title;
  
  console.log('Title:', title);

  const headers = {
    'Content-Disposition': `attachment; filename="${title}.mp3"`,
    'Content-Type': 'audio/mpeg'
  };

  console.log('Headers:', headers)

  const audioFormat = ytdl.chooseFormat(info.formats, { filter: "audioonly" });
  const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat });

  console.log('Audio Stream:', audioStream);

  audioStream.pipe

  return new Response(audioStream as any, { status: 200, headers });
}
