import { NextResponse } from "next/server";

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
  uptime: number;
  memory: {
    heapUsed: number;
    heapTotal: number;
    rss: number;
  };
  dependencies: {
    dataAccess: ServiceHealth;
    storage: ServiceHealth;
  };
}

async function checkService(name: string, url: string): Promise<ServiceHealth> {
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`${name} returned ${response.status}`);
    }

    return {
      status: "OK",
      latency: Date.now() - start,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
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

  return {
    heapUsed: Math.round(memory.heapUsed / 1024 / 1024), // MB
    heapTotal: Math.round(memory.heapTotal / 1024 / 1024), // MB
    rss: Math.round(memory.rss / 1024 / 1024), // MB
  };
}

export async function GET() {
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
    uptime: Math.round(startTime),
    memory: getMemoryUsage(),
    dependencies: {
      dataAccess,
      storage,
    },
  };

  const headers = {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Content-Type": "application/health+json",
    "X-Content-Type-Options": "nosniff",
  };

  return NextResponse.json(health, {
    status: health.status === "OK" ? 200 : 503,
    headers,
  });
}
