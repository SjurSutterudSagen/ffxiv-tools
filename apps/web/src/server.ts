import { rateLimiter } from "./lib/rate-limit";
import { log } from "./lib/logger";

const SHUTDOWN_GRACE_PERIOD = 10_000; // 10 seconds

function setupGracefulShutdown() {
  const cleanup = async () => {
    log("info", "Shutdown signal received, starting cleanup...");

    // Set a timeout to force exit
    const forceExit = setTimeout(() => {
      log("warn", "Forced shutdown after grace period");

      process.exit(1);
    }, SHUTDOWN_GRACE_PERIOD);

    try {
      rateLimiter.stop();

      log("info", "Cleanup completed successfully");

      process.exit(0);
    } catch (error) {
      log("error", "Cleanup failed", { error: String(error) });

      process.exit(1);
    } finally {
      clearTimeout(forceExit);
    }
  };

  process.on("SIGTERM", cleanup);
  process.on("SIGINT", cleanup);
}

setupGracefulShutdown();
