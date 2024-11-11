import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { Category } from '@/types/category';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { data } = await api.get('/users/categories/all');
      return data;
    }
  });
}