import React from 'react';
import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from "history";
import { PrivateRoute } from '@/presentation/pages';

type SutTypes = {
  history: MemoryHistory;
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <Router location={history.location} navigator={history}>
      <PrivateRoute />
    </Router>
  );

  return { history };
};

describe('PrivateRoute', () => {
  it('should redirect to /signin if token is empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/signin');
  });
});
