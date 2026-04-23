export class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }

  toUserMessage() {
    return this.message;
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class ApiError extends AppError {
  constructor(message, status = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  toUserMessage() {
    const code = this.status != null ? ` (${this.status})` : '';
    return `Something went wrong with the service${code}. ${this.message}`;
  }
}

export class NetworkError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }

  toUserMessage() {
    return 'Network problem — check your connection and try again.';
  }
}

export class StorageError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'StorageError';
    Object.setPrototypeOf(this, StorageError.prototype);
  }

  toUserMessage() {
    return `Could not use saved screenshots storage: ${this.message}`;
  }
}

export class ConfigError extends AppError {
  constructor(message) {
    super(message);
    this.name = 'ConfigError';
    Object.setPrototypeOf(this, ConfigError.prototype);
  }

  toUserMessage() {
    return this.message;
  }
}
