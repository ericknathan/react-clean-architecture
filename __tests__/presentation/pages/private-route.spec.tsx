import React from 'react';
import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { PrivateRoute } from '@/presentation/pages';

describe('PrivateRoute', () => {
  it('should redirect to /signin if token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router location={history.location} navigator={history}>
        <PrivateRoute />
      </Router>
    );
    expect(history.location.pathname).toBe('/signin');
  });
});
