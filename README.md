# YouTube to MP3 Converter (Nagini to MP3)

This project is a web application that allows users to convert YouTube videos to MP3 audio files and download them. The application is built with Next.js and Docker, using `ytdl-core` for downloading videos and `fluent-ffmpeg` for converting video to audio.

## Features

- Convert YouTube videos to MP3 audio files.
- Download the converted MP3 files.
- Simple and intuitive user interface.

## Prerequisites

- Node.js (v14 or higher)
- Docker
- Docker Compose

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/yourusername/yt-to-mp3.git
cd yt-to-mp3
```

### Environment Setup

Create a `.env` file in the root directory with the following content:

```env
NODE_ENV=production
```

### Install Dependencies

You need to install `ffmpeg` on your local machine if you are not using Docker.

#### For macOS:

```sh
brew install ffmpeg
```

#### For Ubuntu:

```sh
sudo apt update
sudo apt install ffmpeg
```

### Docker Setup

Build and run the Docker container:

```sh
docker-compose up --build
```

This will build the Docker image and start the application on `http://localhost:3000`.

## Project Structure

- `app/`: Contains the Next.js application.
  - `api/download/route.ts`: API route to handle the video download and conversion.
  - `page.tsx`: Main page of the application.
- `public/`: Directory to store the generated MP3 files.
- `Dockerfile`: Docker configuration for the application.
- `docker-compose.yml`: Docker Compose configuration for the application.
- `package.json`: Project dependencies and scripts.
- `tailwind.config.js`: Tailwind CSS configuration.
- `.env`: Environment variables.

## Usage

1. Open your web browser and go to `http://localhost:3000`.
2. Enter the URL of the YouTube video you want to convert to MP3.
3. Click the "Convert" button.
4. After the conversion is complete, click the "Download MP3" link to download the audio file.

## Development

### Running Locally

If you prefer to run the application locally without Docker, follow these steps:

1. Install dependencies:

   ```sh
   npm install
   ```

2. Run the development server:

   ```sh
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

To build the application for production, run:

```sh
npm run build
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, improvements, or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to customize the README file according to your needs. If you have any other requests or need further assistance, let me know!
