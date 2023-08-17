import { useQuery } from '@tanstack/react-query';
import { getPopularRecipes } from '../../services/apiRecipes';

export function usePopularRecipes() {
  const { isLoading, data } = useQuery({
    queryKey: ['popularRecipes'],
    queryFn: getPopularRecipes,
  });

  return { data, isLoading };
}