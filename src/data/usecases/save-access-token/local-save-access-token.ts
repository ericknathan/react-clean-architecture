import { SetStorage } from '@/data/protocols/cache';
import { SaveAccessToken } from '@/domain/usecases';

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(
    private readonly setStorage: SetStorage,
  ) {}

  async save(accessToken: SaveAccessToken.Param): SaveAccessToken.Result {
    await this.setStorage.set('@4devs/accessToken', accessToken);
  }
}
