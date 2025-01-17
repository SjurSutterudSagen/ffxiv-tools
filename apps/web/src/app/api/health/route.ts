import { NextResponse } from "next/server";

interface HealthStatus {
  status: "OK" | "ERROR";
  uptime: number;
  dependencies: {
    dataAccess: {
      status: "OK" | "ERROR";
      latency?: number;
    };
    storage: {
      status: "OK" | "ERROR";
      latency?: number;
    };
  };
}

async function checkService(url: string) {
  const start = Date.now();
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Service returned ${response.status}`);
    return {
      status: "OK" as const,
      latency: Date.now() - start,
    };
  } catch (error) {
    return {
      status: "ERROR" as const,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function GET() {
  const startTime = process.uptime();

  const [dataAccess, storage] = await Promise.all([
    checkService("http://data-access:3001/health"),
    checkService("http://storage:3002/health"),
  ]);

  const health: HealthStatus = {
    status:
      dataAccess.status === "OK" && storage.status === "OK" ? "OK" : "ERROR",
    uptime: startTime,
    dependencies: {
      dataAccess,
      storage,
    },
  };

  return NextResponse.json(health, {
    status: health.status === "OK" ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}
