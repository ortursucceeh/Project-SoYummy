import { useQuery } from '@tanstack/react-query';
import { getFavoritesRecipes } from '../../services/apiRecipes';
import { useSearchParams } from 'react-router-dom';
import { getPages } from '../../utils/functions';

export function useFavoritesRecipes() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? 1;

  const { isLoading, data, isFetching, isPreviousData } = useQuery({
    queryKey: ['favoritesRecipes', page],
    queryFn: () => getFavoritesRecipes(page),
    keepPreviousData: true,
  });

  const pages = getPages(data?.total, data?.limit);

  return { data, isLoading, pages, isFetching, isPreviousData };
}
