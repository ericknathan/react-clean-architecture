import { faker } from '@faker-js/faker/locale/pt_BR';

import { HttpClient } from '@/mocks/data';
import { mockAccountModel, mockAddAccountParams } from '@/mocks/domain';
import { RemoteAddAccount } from '@/data/usecases';
import { HttpStatusCode } from '@/data/protocols/http';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
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
  };
};


describe('RemoteAddAccount', () => {
  it('should call HttpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });
    
  it('should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });
  
  it('should throw EmailInUseError if HttpClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });
  
  it('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.SERVER_ERROR,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  
  it('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND,
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  
  it('should return an AccountModel if HttpClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: httpResult
    };
    const account = await sut.add(mockAddAccountParams());
    expect(account).toEqual(httpResult);
  });
});
