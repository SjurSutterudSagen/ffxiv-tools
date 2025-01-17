import { SECURITY } from "../../../../packages/typescript-config/src";

export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS?.split(",") ??
  (process.env.NODE_ENV === "production"
    ? SECURITY.CORS.PRODUCTION.ORIGINS
    : SECURITY.CORS.DEVELOPMENT.ORIGINS);
