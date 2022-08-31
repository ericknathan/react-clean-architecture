import { createContext } from 'react';
import { Account } from '@/domain/models';

type ApiContextProps = {
  setCurrentAccount: (account: Account.Model) => void;
}

export const ApiContext = createContext<ApiContextProps>(null!);
