import type { HealthConfig } from "./health";
import type { RateLimitConfig } from "./rate-limit";
import type { SecurityConfig } from "./security";

export interface Config {
  health: HealthConfig;
  rateLimit: RateLimitConfig;
  security: SecurityConfig;
}
