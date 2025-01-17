import { URLS, constructServiceUrl } from "./urls";

export const HEALTH = {
  TIMEOUT_MS: 5000,
  MAX_RETRIES: 2,
  SERVICES: {
    DATA_ACCESS: {
      DEVELOPMENT: `${constructServiceUrl("DEVELOPMENT", "DATA_ACCESS")}${
        URLS.SERVICES.DATA_ACCESS.HEALTH
      }`,
      PRODUCTION: `${constructServiceUrl("PRODUCTION", "DATA_ACCESS")}${
        URLS.SERVICES.DATA_ACCESS.HEALTH
      }`,
    },
    STORAGE: {
      DEVELOPMENT: `${constructServiceUrl("DEVELOPMENT", "STORAGE")}${
        URLS.SERVICES.STORAGE.HEALTH
      }`,
      PRODUCTION: `${constructServiceUrl("PRODUCTION", "STORAGE")}${
        URLS.SERVICES.STORAGE.HEALTH
      }`,
    },
  },
} as const;

export type HealthConfig = typeof HEALTH;
