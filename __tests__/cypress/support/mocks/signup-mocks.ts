import { HttpHelper } from '@/tests/cypress/support/mocks';

export const mockEmailInUseError = (): void => HttpHelper.mockEmailInUseError(/signup/);