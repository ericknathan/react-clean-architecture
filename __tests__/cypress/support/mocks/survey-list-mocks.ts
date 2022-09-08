import { HttpHelper } from '@/tests/cypress/support/mocks';

export const mockUnexpectedError = (): void => HttpHelper.mockUnexpectedError(/surveys/, 'GET');
