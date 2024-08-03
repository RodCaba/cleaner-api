class ServiceOverlapError extends Error {
  status: number;
  constructor() {
    super('Service overlap error');
    this.status = 400;
  }
}

export { ServiceOverlapError };
