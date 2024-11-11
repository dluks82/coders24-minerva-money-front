import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { useAccount } from '@/contexts/account-context';
import { Dashboard } from '@/types/dashboard';

export function useDashboard() {
  const { selectedAccount } = useAccount();

  return useQuery({
    queryKey: ['dashboard', selectedAccount?.id],
    queryFn: async (): Promise<Dashboard> => {
      const { data } = await api.get<Dashboard>(`/accounts/${selectedAccount?.id}/dashboard`);
      return data;
    },
    enabled: !!selectedAccount, // Só executa se tiver uma conta selecionada
  });
}