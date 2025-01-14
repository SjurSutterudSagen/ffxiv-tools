# Using node:22-alpine3.21 to avoid some nextjs issues with 
# glibc-based linux version and memory issues

# Stage 1: Dependencies
FROM node:22-alpine3.21 AS deps
WORKDIR /app

# Update system packages with no cache
RUN apk upgrade --no-cache

# Create a directory for npm cache and set proper permissions
RUN mkdir -p /usr/lib/node_modules && \
  chown -R node:node /usr/lib/node_modules

# Copy package files
COPY package.json package-lock.json ./
RUN mkdir -p apps/web
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies
RUN npm ci --no-audit

# Stage 2: Builder
FROM node:22-alpine3.21 AS builder
WORKDIR /app

# Update system packages with no cache
RUN apk upgrade --no-cache

# Create directory structure
RUN mkdir -p apps/web

# Copy deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /usr/lib/node_modules /usr/lib/node_modules

# Copy source files
COPY package.json package-lock.json ./
COPY apps/web ./apps/web

# Build the app
RUN npm run build:web

# Stage 3: Runner
FROM node:22-alpine3.21 AS runner
WORKDIR /app

LABEL org.opencontainers.image.source="https://github.com/SjurSutterudSagen/ffxiv-tools" \
  org.opencontainers.image.description="FFXIV Tools Web Application" \
  org.opencontainers.image.licenses="MIT"

# Update system packages with no cache
RUN apk --no-cache upgrade && \
  apk --no-cache add curl

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV TZ=UTC
ENV NODE_PATH=/usr/lib/node_modules

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Set proper permissions for the app directory
RUN mkdir -p /app && chown -R nextjs:nodejs /app

# Copy only necessary files
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /usr/lib/node_modules /usr/lib/node_modules

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "apps/web/server.js"]
