import { NextRequest } from "next/server";
import ytdl from "ytdl-core";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const url = requestUrl.searchParams.get('url') || '';

  const info = await ytdl.getInfo(url);
  const validateURL = ytdl.validateURL(url);
  const title = info.videoDetails.title;
  
  console.log('Title:', title);

  const headers = {
    "Content-Disposition": `inline; filename="${title}.mp3"`,
  };

  const audioFormat = ytdl.chooseFormat(info.formats, { filter: "audioonly" });
  const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat });

  audioStream.pipe

  return new Response(audioStream as any, { headers });
}
