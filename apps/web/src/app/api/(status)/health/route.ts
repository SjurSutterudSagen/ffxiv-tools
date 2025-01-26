export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { rateLimiter } from "@/lib/rate-limit";
import { ALLOWED_ORIGINS } from "@/lib/constants";
import { HEALTH } from "@ffxiv-tools/typescript-config";
import { log } from "@/lib/logger";
import { ServiceError } from "@/lib/errors";

interface ServiceHealth {
  status: "OK" | "ERROR";
  latency?: number;
  error?: string;
  timestamp: string;
}

interface HealthStatus {
  status: "OK" | "ERROR";
  version: string;
  environment: string;
  timestamp: string;
  uptimeSeconds: number;
  memory: {
    heapUsedMB: number;
    heapTotalMB: number;
    residentSetSizeMB: number;
    maxHeapSizeMB?: number;
    heapUsedPercentage?: number;
  };
  dependencies: {
    dataAccess: ServiceHealth;
    storage: ServiceHealth;
  };
}

async function checkService(
  name: string,
  url: string,
  retryCount = 0
): Promise<ServiceHealth> {
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HEALTH.TIMEOUT_MS);

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": "FFXIV-Tools-Web-Health-Check/1.0",
      },
      signal: controller.signal,
      next: { revalidate: 0 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Retry on 5xx errors
      if (response.status >= 500 && retryCount < HEALTH.MAX_RETRIES) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (retryCount + 1))
        );

        return checkService(name, url, retryCount + 1);
      }
      throw new ServiceError(
        `Service returned ${response.status}`,
        response.status,
        name
      );
    }

    return {
      status: "OK",
      latency: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return {
        status: "ERROR",
        latency: HEALTH.TIMEOUT_MS,
        error: `${name} timed out after ${HEALTH.TIMEOUT_MS}ms`,
        timestamp: new Date().toISOString(),
      };
    }

    log("error", `Health check failed for ${name}`, { service: name });

    return {
      status: "ERROR",
      latency: Date.now() - start,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    };
  }
}

function getMemoryUsage() {
  const memory = process.memoryUsage();
  const toMB = (bytes: number) => Math.round(bytes / 1024 / 1024);
  const maxMemory = process.env.NODE_OPTIONS?.match(
    /--max-old-space-size=(\d+)/
  )?.[1];

  return {
    heapUsedMB: toMB(memory.heapUsed),
    heapTotalMB: toMB(memory.heapTotal),
    residentSetSizeMB: toMB(memory.rss),
    maxHeapSizeMB: maxMemory ? parseInt(maxMemory) : undefined,
    heapUsedPercentage: maxMemory
      ? Math.round(
          (memory.heapUsed / (parseInt(maxMemory) * 1024 * 1024)) * 100
        )
      : undefined,
  };
}

function validateOrigin(requestHeaders: Headers): boolean {
  const origin = requestHeaders.get("origin");

  if (!origin) {
    return true;
  } // Allow requests without origin

  try {
    const url = new URL(origin);

    return ALLOWED_ORIGINS.some((domain) => {
      return url.hostname.endsWith(domain);
    });
  } catch {
    return false;
  }
}

export async function GET() {
  const requestHeaders = await headers();

  // Get client identifier (IP or some header)
  const clientId =
    requestHeaders.get("x-forwarded-for") ||
    requestHeaders.get("x-real-ip") ||
    "unknown";

  // Check rate limit
  if (await rateLimiter.isRateLimited(clientId)) {
    return new NextResponse(null, {
      status: 429,
      statusText: "Too Many Requests",
    });
  }

  // Origin validation
  if (!validateOrigin(requestHeaders)) {
    return new NextResponse(null, {
      status: 403,
      statusText: "Forbidden",
    });
  }

  try {
    const startTime = process.uptime();

    const [dataAccess, storage] = await Promise.all([
      checkService("Data Access", "http://data-access:3001/health"),
      checkService("Storage", "http://storage:3002/health"),
    ]);

    const health: HealthStatus = {
      status:
        dataAccess.status === "OK" && storage.status === "OK" ? "OK" : "ERROR",
      version: process.env.BUILD_REVISION || "unknown",
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(startTime),
      memory: getMemoryUsage(),
      dependencies: {
        dataAccess,
        storage,
      },
    };

    const responseHeaders = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Content-Type": "application/health+json",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "no-referrer",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    };

    return NextResponse.json(health, {
      status: health.status === "OK" ? 200 : 503,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      { status: "ERROR", error: "Internal health check failed" },
      { status: 500 }
    );
  }
}
