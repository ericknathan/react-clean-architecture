import { mockAccountModel } from '@/../__mocks__/domain';
import { expect } from '@jest/globals';
import { LocalStorageAdapter } from '@/infra/cache';
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters';
import { UnexpectedError } from '@/domain/errors';

jest.mock('@/infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  beforeEach(() => jest.clearAllMocks());
  
  it('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('@4devs/account', account);
  });

  it('should throw UnexpectedError', () => {
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    expect(() => {
      setCurrentAccountAdapter(undefined!);
    }).toThrow(new UnexpectedError());
    expect(setSpy).toHaveBeenCalledTimes(0);
  });
  
  it('should call LocalStorageAdapter.get with correct values', () => {
    const account = mockAccountModel();
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account);
    const result = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith('@4devs/account');
    expect(result).toEqual(account);
  });
  
});
