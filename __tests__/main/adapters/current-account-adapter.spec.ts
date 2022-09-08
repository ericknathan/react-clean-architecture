import { mockAccountModel } from '@/../__mocks__/domain';
import { expect } from '@jest/globals';
import { LocalStorageAdapter } from '@/infra/cache';
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters';

jest.mock('@/infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  beforeEach(() => jest.clearAllMocks());
  
  it('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('@4devs/account', account);
  });

  it('should call LocalStorageAdapter.get with correct values', () => {
    const account = mockAccountModel();
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account);
    const result = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith('@4devs/account');
    expect(result).toEqual(account);
  });
  
});
