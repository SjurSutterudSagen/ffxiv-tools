# syntax=docker/dockerfile:1.4

# Using the official Rust image for building
FROM rust:1.84.0-alpine3.21 AS builder

ARG BUILD_DATE
ARG BUILD_REVISION

# Validate build arguments
RUN test -n "$BUILD_DATE" || (echo "BUILD_DATE not set" && false)
RUN test -n "$BUILD_REVISION" || (echo "BUILD_REVISION not set" && false)

# Set environment variables for the build
ENV CARGO_TERM_COLOR=always \
  CARGO_NET_GIT_FETCH_WITH_CLI=true \
  CARGO_HOME=/usr/local/cargo \
  RUST_BACKTRACE=1

# Create a new empty shell project
WORKDIR /usr/src/ffxiv-tools-data-access

# Install required system dependencies
# hadolint ignore=DL3018
RUN apk --no-cache upgrade && \
  apk add --no-cache \
  musl-dev \
  pkgconfig \
  openssl-dev \
  git \
  build-base

# Create a new user
RUN addgroup -S rust && adduser -S rust -G rust

# Set ownership of cargo home
RUN chown -R rust:rust $CARGO_HOME

# Create src directory with proper permissions
RUN mkdir -p /usr/src/ffxiv-tools-data-access/src && \
  chown -R rust:rust /usr/src/ffxiv-tools-data-access

# Switch to non-root user for building
USER rust

# Copy manifests
COPY --chown=rust:rust Cargo.* ./

# Cache dependencies
# hadolint ignore=DL3059
RUN echo "fn main() {}" > src/main.rs && \
  cargo build --release --locked && \
  rm -rf src

# Copy the source code
COPY --chown=rust:rust src ./src

# Build the application
RUN cargo build --release --locked && \
  cargo clean --release --doc && \
  strip target/release/ffxiv-tools-data-access

# Final stage
FROM alpine:3.21.0

WORKDIR /app

LABEL org.opencontainers.image.source="https://github.com/SjurSutterudSagen/ffxiv-tools" \
  org.opencontainers.image.description="FFXIV Tools Data Access Service" \
  org.opencontainers.image.licenses="MIT" \
  org.opencontainers.image.version="0.1.0" \
  org.opencontainers.image.created="${BUILD_DATE}" \
  org.opencontainers.image.revision="${BUILD_REVISION}" \
  org.opencontainers.image.authors="Sjur Sutterud Sagen"

# Install runtime dependencies
RUN apk --no-cache upgrade && \
  apk add --no-cache \
  ca-certificates \
  wget \
  tzdata \
  tini

# Create a non-root user
RUN addgroup -S rust && adduser -S rust -G rust

# Copy the binary from builder
COPY --from=builder /usr/src/ffxiv-tools-data-access/target/release/ffxiv-tools-data-access /app/

# Set ownership
RUN chown -R rust:rust /app

# Use the non-root user
USER rust

# Expose the port the app runs on
EXPOSE 3001

# Set runtime environment variables
ENV RUST_LOG=info \
  TZ=UTC \
  RUST_BACKTRACE=1 \
  RUST_LOG_FORMAT=json

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3001/health | grep -q "OK" || exit 1

# Use tini as init
ENTRYPOINT ["/sbin/tini", "--"]

# Run the application
CMD ["/app/ffxiv-tools-data-access"]
