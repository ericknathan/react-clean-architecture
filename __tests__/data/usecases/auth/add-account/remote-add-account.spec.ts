import { faker } from '@faker-js/faker/locale/pt_BR';

import { HttpClient } from '@/mocks/data';
import { mockAddAccountParams } from '@/mocks/domain';
import { RemoteAddAccount } from '@/data/usecases';
import { AddAccount } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpClient<AddAccount.Params, AccountModel>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpClient<AddAccount.Params, AccountModel>();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy
  }
}


describe('RemoteAddAccount', () => {
  it('should call HttpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });
});
