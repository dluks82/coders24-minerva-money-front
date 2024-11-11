import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Account } from '@/types/user';

export function useAccounts() {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async (): Promise<Account[]> => {
      const { data } = await api.get('/accounts');
      return data;
    }
  });
}