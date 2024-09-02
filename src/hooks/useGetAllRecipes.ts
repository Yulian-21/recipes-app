import { useQuery } from '@tanstack/react-query';
import { Recipe, RecipesResponse } from '../interfaces/interfaces';

const fetchRecipes = async (): Promise<Recipe[]> => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  if (!res.ok) {
    throw new Error('Failed to fetch recipes');
  }
  const data: RecipesResponse = await res.json();
  return data.meals || [];
};

const useGetAllRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: () => fetchRecipes(),
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetAllRecipes;
