export class ServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly service?: string
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof ServiceError;
}
