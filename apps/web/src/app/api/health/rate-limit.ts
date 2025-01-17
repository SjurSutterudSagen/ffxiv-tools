interface RateLimitEntry {
  count: number;
  timestamp: number;
}

class InMemoryRateLimiter {
  private requests: Map<string, RateLimitEntry>;
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs = 60000, maxRequests = 20) {
    this.requests = new Map();
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    // Clean up old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now - entry.timestamp > this.windowMs) {
        this.requests.delete(key);
      }
    }
  }

  async isRateLimited(identifier: string): Promise<boolean> {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry) {
      this.requests.set(identifier, { count: 1, timestamp: now });
      return false;
    }

    if (now - entry.timestamp > this.windowMs) {
      this.requests.set(identifier, { count: 1, timestamp: now });
      return false;
    }

    if (entry.count >= this.maxRequests) {
      return true;
    }

    entry.count++;
    return false;
  }
}

// Export a singleton instance
export const rateLimiter = new InMemoryRateLimiter();
