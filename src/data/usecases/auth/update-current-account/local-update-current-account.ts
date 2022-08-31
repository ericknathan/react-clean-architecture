import { SetStorage } from '@/data/protocols/cache';
import { UnexpectedError } from '@/domain/errors';
import { UpdateCurrentAccount } from '@/domain/usecases';

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(
    private readonly setStorage: SetStorage,
  ) {}

  async save(account: UpdateCurrentAccount.Params): UpdateCurrentAccount.Result {
    if(!account?.name || !account?.accessToken) throw new UnexpectedError();
    this.setStorage.set('@4devs/account', JSON.stringify(account));
  }
}
