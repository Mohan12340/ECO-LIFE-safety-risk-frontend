# ---------- Build stage ----------
FROM node:24-alpine AS builder

WORKDIR /app

# Leverage Docker layer caching for npm packages
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source code
COPY . .


# ---------- Production stage ----------
FROM node:24-alpine AS production

# Install dumb-init for proper signal handling and process management
RUN apk add --no-cache dumb-init

ENV NODE_ENV=production

# Ensure non-root execution
WORKDIR /app
RUN chown node:node /app
USER node

# Copy dependencies and install only production modules
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy runtime assets and entrypoint from the repository
COPY --chown=node:node --from=builder /app/server.js ./server.js
COPY --chown=node:node --from=builder /app/public ./public

# Match the port defined in server.js (commonly 3000 or 8080)
EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]
