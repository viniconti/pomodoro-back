
FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pomodoro" npx prisma generate

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
