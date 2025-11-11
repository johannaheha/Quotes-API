# ----- builder -----
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ----- runner -----
FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
# nur prod deps installieren
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev  
# Build-Artefakte
COPY --from=builder /app/dist ./dist

EXPOSE 3000
# Render setzt PORT – deine App muss darauf hören
CMD ["node", "dist/main.js"]
