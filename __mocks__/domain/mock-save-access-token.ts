import { SaveAccessToken } from '@/domain/usecases';

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken!: string;
  
  async save (accessToken: string): SaveAccessToken.Result {
    this.accessToken = accessToken;
  }
}
