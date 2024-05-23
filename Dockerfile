FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install ytdl-core
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]