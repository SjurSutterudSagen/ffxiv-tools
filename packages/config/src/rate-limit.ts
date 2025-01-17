export const RATE_LIMIT = {
  DEFAULT: {
    WINDOW_MS: 60_000, // 1 minute
    MAX_REQUESTS: 20, // requests per window
    CLEANUP_INTERVAL_MS: 60_000, // cleanup every minute
    MAX_ENTRIES: 10000, // max unique IPs
  },
  STRICT: {
    WINDOW_MS: 60_000,
    MAX_REQUESTS: 10, // stricter limit
    CLEANUP_INTERVAL_MS: 30_000, // more frequent cleanup
    MAX_ENTRIES: 20000, // higher capacity
  },
} as const;

export type RateLimitConfig = typeof RATE_LIMIT;
