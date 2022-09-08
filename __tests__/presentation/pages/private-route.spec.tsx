import React from 'react';
import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from "history";
import { PrivateRoute } from '@/presentation/pages';
import { ApiContext } from '@/presentation/contexts';
import { mockAccountModel } from '@/../__mocks__/domain';
import { Account } from 'domain/models';

type SutTypes = {
  history: MemoryHistory;
}

const makeSut = (account: Account.Model | null = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <ApiContext.Provider value={{
      getCurrentAccount: () => account,
      setCurrentAccount: jest.fn()
    }}>
      <Router location={history.location} navigator={history}>
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>
  );

  return { history };
};

describe('PrivateRoute', () => {
  it('should redirect to /signin if token is empty', () => {
    const { history } = makeSut(null);
    expect(history.location.pathname).toBe('/signin');
  });

  it('should render current component if token is not empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/');
  });
});
