import { createContext } from 'react';
import { Account } from '@/domain/models';

type ApiContextProps = {
  setCurrentAccount?: (account: Account.Model) => void;
  getCurrentAccount?: () => Account.Model | null;
}

export const ApiContext = createContext<ApiContextProps>(null!);