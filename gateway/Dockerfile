FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

EXPOSE 3000

COPY --from=build /app/dist ./dist

CMD ["node", "dist/app.js"]