import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters';
import React, { ReactNode } from 'react';

import { ApiContext } from './api-context';

type AppProviderProps = {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      {children}
    </ApiContext.Provider>
  );
}

export * from './api-context';
