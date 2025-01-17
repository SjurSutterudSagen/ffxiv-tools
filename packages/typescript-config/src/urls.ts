interface DevelopmentEnvironment {
  BASE_URL: string;
  PORTS: {
    WEB: string;
    DATA_ACCESS: string;
    STORAGE: string;
  };
}

interface ProductionEnvironment {
  BASE_URL: string;
  USE_HTTPS: true;
  USE_SUBDOMAINS: true;
}

type Environment = DevelopmentEnvironment | ProductionEnvironment;

export const URLS = {
  ENVIRONMENTS: {
    DEVELOPMENT: {
      BASE_URL: process.env.DEV_BASE_URL || "http://localhost",
      PORTS: {
        WEB: process.env.DEV_WEB_PORT || "3000",
        DATA_ACCESS: process.env.DEV_DATA_ACCESS_PORT || "3001",
        STORAGE: process.env.DEV_STORAGE_PORT || "3002",
      },
    },
    PRODUCTION: {
      BASE_URL: process.env.BASE_URL || "ffxiv-tools.com",
      USE_HTTPS: true,
      USE_SUBDOMAINS: true,
    },
  },
  SERVICES: {
    WEB: {
      PATH: "", // Root domain
      HEALTH: "/api/health",
      LIVE: "/api/live",
      READY: "/api/ready",
    },
    DATA_ACCESS: {
      PATH: "data-access",
      HEALTH: "/health",
    },
    STORAGE: {
      PATH: "storage",
      HEALTH: "/health",
    },
  },
} as const;

export const constructServiceUrl = (
  environment: keyof typeof URLS.ENVIRONMENTS,
  service: keyof typeof URLS.SERVICES
) => {
  const env: Environment = URLS.ENVIRONMENTS[environment];
  const serviceDef = URLS.SERVICES[service];

  if (environment === "DEVELOPMENT") {
    const devEnv = env as DevelopmentEnvironment;
    return `${devEnv.BASE_URL}:${devEnv.PORTS[service]}`;
  }

  // Production handling
  const prodEnv = env as ProductionEnvironment;
  const protocol = prodEnv.USE_HTTPS ? "https://" : "http://";
  const path = serviceDef.PATH;

  if (!path) {
    // Web service on root domain
    return `${protocol}${prodEnv.BASE_URL}`;
  }

  // Other services with subdomains or paths
  if (prodEnv.USE_SUBDOMAINS) {
    return `${protocol}${path}.${prodEnv.BASE_URL}`;
  }

  return `${protocol}${prodEnv.BASE_URL}/${path}`;
};

export type UrlsConfig = typeof URLS;
