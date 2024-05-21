"use client";

import { useState } from 'react';

const Home = () => {
  const [url, setUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (response.ok) {
      setDownloadLink(data.filePath);
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>YouTube Video to MP3 Converter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '300px', padding: '5px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '5px 10px' }}>Convert</button>
      </form>
      {downloadLink && (
        <div style={{ marginTop: '20px' }}>
          <a href={downloadLink} download>Download MP3</a>
        </div>
      )}
    </div>
  );
};

export default Home;