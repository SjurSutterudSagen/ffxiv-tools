type LogLevel = "info" | "warn" | "error";

interface LogContext {
  service?: string;
  podName?: string;
  namespace?: string;
  error?: string;
}

export function log(level: LogLevel, message: string, context?: LogContext) {
  const timestamp = new Date().toISOString();
  const podInfo = process.env.POD_NAME
    ? `[${process.env.POD_NAMESPACE}/${process.env.POD_NAME}]`
    : "";

  console[level](
    `${timestamp} ${podInfo} ${context?.service ?? ""}: ${message}`
  );
}
