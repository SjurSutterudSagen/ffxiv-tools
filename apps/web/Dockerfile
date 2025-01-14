# Stage 1: Dependencies
FROM node:22-bookworm-slim AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN mkdir -p apps/web
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies
RUN npm ci

# Stage 2: Builder
FROM node:22-bookworm-slim AS builder
WORKDIR /app

# Create directory structure
RUN mkdir -p apps/web

# Copy deps
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY package.json package-lock.json ./
COPY apps/web ./apps/web

# Build the app
RUN npm run build:web

# Stage 3: Runner
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Copy only necessary files
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "apps/web/server.js"]
