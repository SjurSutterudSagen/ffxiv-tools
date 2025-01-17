export const URLS = {
  ENVIRONMENTS: {
    DEVELOPMENT: {
      WEB: "http://localhost:3000",
      DATA_ACCESS: "http://localhost:3001",
      STORAGE: "http://localhost:3002",
    },
    PRODUCTION: {
      WEB: "https://ffxiv-tools.com",
      DATA_ACCESS: "http://data-access:3001",
      STORAGE: "http://storage:3002",
    },
  },
  SERVICES: {
    WEB: {
      HEALTH: "/api/health",
      LIVE: "/api/live",
      READY: "/api/ready",
    },
    DATA_ACCESS: {
      HEALTH: "/health",
    },
    STORAGE: {
      HEALTH: "/health",
    },
  },
} as const;

export type UrlsConfig = typeof URLS;
