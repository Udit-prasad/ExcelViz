# Multi-stage build for minimized image footprint and enhanced security
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

# Second stage: final runtime container
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

# Set default Node environment
ENV NODE_ENV=production
# Google Cloud Run injects the PORT env variable automatically (often default to 8080)
ENV PORT=8080

EXPOSE 8080

CMD ["node", "server.js"]
