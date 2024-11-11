'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { Account } from '@/types/user';
import { useAuth } from './auth-context';

interface AccountContextType {
  selectedAccount: Account | null;
  setSelectedAccount: (account: Account) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const { user } = useAuth();

  const handleSelectAccount = (account: Account) => {
    setSelectedAccount(account);
    localStorage.setItem('selectedAccountId', account.id);
  };

  useEffect(() => {
    if (user?.accounts) {
      const savedAccountId = localStorage.getItem('selectedAccountId');
      
      // Tenta encontrar a conta salva
      let accountToSelect = savedAccountId 
        ? user.accounts.find(acc => acc.id === savedAccountId)
        : null;
        
      // Se não encontrar, usa a primeira conta
      if (!accountToSelect && user.accounts.length > 0) {
        accountToSelect = user.accounts[0];
      }

      if (accountToSelect) {
        setSelectedAccount(accountToSelect);
      }
    }
  }, [user?.accounts]);

  return (
    <AccountContext.Provider 
      value={{ 
        selectedAccount, 
        setSelectedAccount: handleSelectAccount 
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within AccountProvider');
  }
  return context;
}