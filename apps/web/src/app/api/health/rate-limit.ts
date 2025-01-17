interface RateLimitConfig {
  windowMs: number; // Window size in milliseconds
  maxRequests: number; // Maximum requests per window
  cleanupIntervalMs: number; // Cleanup interval in milliseconds
}
interface RateLimitEntry {
  count: number;
  timestamp: number;
}
interface RateLimitRequests extends Map<string, RateLimitEntry> {}
interface RateLimitStatus {
  remaining: number;
  reset: number;
  total: number;
}

class InMemoryRateLimiter {
  private readonly requests: RateLimitRequests;
  private readonly config: RateLimitConfig;
  private cleanupInterval: ReturnType<typeof setInterval> | null;

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.requests = new Map();
    this.cleanupInterval = null;

    // Default configuration
    this.config = {
      windowMs: 60_000, // 1 minute
      maxRequests: 20, // 20 requests per minute
      cleanupIntervalMs: 60_000, // Cleanup every minute
      ...config,
    };

    this.startCleanup();
  }

  /**
   * Start the cleanup interval
   * @private
   */
  private startCleanup(): void {
    if (this.cleanupInterval) {
      return;
    }

    this.cleanupInterval = setInterval(
      () => this.cleanup(),
      this.config.cleanupIntervalMs
    );

    // Prevent the interval from keeping the process alive
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Clean up expired entries
   * @private
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now - entry.timestamp > this.config.windowMs) {
        this.requests.delete(key);
      }
    }
  }

  /**
   * Stop the cleanup interval
   * @public
   */
  public stop(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Check if a request should be rate limited
   * @param identifier - Unique identifier for the request (e.g., IP address)
   * @returns Promise<boolean> - True if rate limited, false otherwise
   * @public
   */
  public async isRateLimited(identifier: string): Promise<boolean> {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // First request from this identifier
    if (!entry) {
      this.requests.set(identifier, { count: 1, timestamp: now });

      return false;
    }

    // Window has expired, reset the counter
    if (now - entry.timestamp > this.config.windowMs) {
      this.requests.set(identifier, { count: 1, timestamp: now });

      return false;
    }

    // Check if over limit
    if (entry.count >= this.config.maxRequests) {
      return true;
    }

    // Increment counter
    entry.count++;

    return false;
  }

  /**
   * Get current rate limit status for an identifier
   * @param identifier - Unique identifier for the request
   * @returns RateLimitStatus containing rate limit information
   * @public
   */
  public getRateLimitStatus(identifier: string): RateLimitStatus {
    const entry = this.requests.get(identifier);

    if (!entry) {
      return {
        remaining: this.config.maxRequests,
        reset: Date.now() + this.config.windowMs,
        total: this.config.maxRequests,
      };
    }

    return {
      remaining: Math.max(0, this.config.maxRequests - entry.count),
      reset: entry.timestamp + this.config.windowMs,
      total: this.config.maxRequests,
    };
  }
}

// Export a singleton instance with default configuration
export const rateLimiter = new InMemoryRateLimiter();
