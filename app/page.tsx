"use client";

import { useState } from 'react';
import Image from 'next/image'
import { motion } from "framer-motion";

const Home = () => {
  const [url, setUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);

    if (response.ok) {
      setDownloadLink(response.url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-4">
      <div className="mb-4">
        <motion.div
          className="box"
          animate={{
            scale: [1, 1, 1, 1, 1],
            rotate: [0, 0, 360, 360, 0],
            borderRadius: ["50%", "50%", "50%", "50%", "50%"]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 4
          }}
        >
          <Image className="rounded" src={'/assets/images/nagini_transparent.png'} width={300} height={300} alt="Nagini Logo" />
        </motion.div>
      </div>
      <div className="w-full max-w-lg px-4">
        <h1 className="text-4xl font-medium text-gray-900 dark:text-black text-center">NAGINI.MP3</h1>
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-8 dark:bg-gray-700" />
        <div>
          <form onSubmit={handleSubmit} className="space-x-4 flex">
            <input
              type="text"
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {!downloadLink ? (
              <button className="w-32 bg-pink-200 hover:bg-gray-100 text-gray-800 font-semibold py-4 px-4 border border-gray-400 rounded shadow">
                Converter
              </button>
            ) : (
              <a href={downloadLink} download className="w-32 bg-pink-200 hover:bg-gray-100 text-gray-800 font-semibold py-4 px-4 border border-gray-400 rounded shadow text-center">
                Baixar
              </a>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;