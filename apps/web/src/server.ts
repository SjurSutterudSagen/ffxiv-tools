import { rateLimiter } from "./lib/rate-limit";

function setupGracefulShutdown() {
  const cleanup = () => {
    console.info("Shutdown signal received, cleaning up...");

    rateLimiter.stop();
    process.exit(0);
  };

  process.on("SIGTERM", cleanup);
  process.on("SIGINT", cleanup);
}

setupGracefulShutdown();
