import React from 'react';
import { expect } from '@jest/globals';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { fireEvent, render, screen } from '@testing-library/react';

import { Header } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';
import { Account } from '@/domain/models';
import { mockAccountModel } from '@/mocks/domain';

type SutTypes = {
  setCurrentAccountMock: (account: Account.Model) => void;
}

const history = createMemoryHistory({ initialEntries: ['/'] });
const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => account
    }}>
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
  );

  return {
    setCurrentAccountMock
  };
};

describe('Header Component', () => {
  it('should call setCurrentAccount with null', () => {
    const { setCurrentAccountMock } = makeSut();
    fireEvent.click(screen.getByTestId('header-logout-button'));

    expect(setCurrentAccountMock).toHaveBeenCalledWith(null);
    expect(history.location.pathname).toBe('/signin');
  });
  
  it('should render username correctly', () => {
    const account = mockAccountModel();
    makeSut(account);
    expect(screen.getByTestId('header-username').textContent).toBe(account.name);
  });
});
