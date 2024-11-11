// src/hooks/use-transactions.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useAccount } from '@/contexts/account-context';
import type { Transaction } from '@/types/transaction';
import type { Page } from '@/types/pagination';

export function useTransactions(page: number = 0) {
  const { selectedAccount } = useAccount();

  return useQuery({
    queryKey: ['transactions', selectedAccount?.id, page],
    queryFn: async (): Promise<Page<Transaction>> => {
      const { data } = await api.get(
        `/accounts/${selectedAccount?.id}/transactions?page=${page}`
      );
      return data;
    },
    enabled: !!selectedAccount,
  });
}