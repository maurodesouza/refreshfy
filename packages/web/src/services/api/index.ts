export * from './error/AuthTokenError';
import { setupApiClient } from './setupApiClient';

const api = setupApiClient();

export { api, setupApiClient };
