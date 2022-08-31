import { mockAccountModel } from '@/../__mocks__/domain';
import { expect } from '@jest/globals';
import { LocalStorageAdapter } from '@/infra/cache';
import { setCurrentAccountAdapter } from '@/main/adapters';

jest.mock('@/infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  it('should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('@4devs/account', account);
  });
});
