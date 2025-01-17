declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    BUILD_REVISION?: string;
    POD_NAME?: string;
    POD_NAMESPACE?: string;
    KUBERNETES_NODE_NAME?: string;
    RATE_LIMIT_MAX_ENTRIES?: string;
    ALLOWED_ORIGINS?: string;
  }
}
