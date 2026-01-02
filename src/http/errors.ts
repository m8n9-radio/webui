import "server-only";

export class ProxyError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = "ProxyError";
  }
}

export class NetworkError extends ProxyError {
  constructor(message = "Network error occurred") {
    super(message, "network_error");
    this.name = "NetworkError";
  }
}

export class ServerError extends ProxyError {
  constructor(statusCode: number, message = "Server error occurred") {
    super(message, "server_error", statusCode);
    this.name = "ServerError";
  }
}

export class NotFoundError extends ProxyError {
  constructor(message = "Resource not found") {
    super(message, "not_found", 404);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends ProxyError {
  constructor(message = "Conflict occurred") {
    super(message, "conflict", 409);
    this.name = "ConflictError";
  }
}
