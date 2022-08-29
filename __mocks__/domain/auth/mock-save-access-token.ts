import { SaveAccessToken } from '@/domain/usecases';

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: SaveAccessToken.Param;
  
  async save (accessToken: SaveAccessToken.Param): SaveAccessToken.Result {
    this.accessToken = accessToken;
  }
}
