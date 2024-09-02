import { useQuery } from '@tanstack/react-query';
import { RecipesResponse } from '../interfaces/interfaces';

const fetchRecipesByCategory = async (category: string) => {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  if (!res.ok) throw new Error('Network response was not ok');
  const data: RecipesResponse = await res.json();
  return data.meals;
};

const fetchAllRecipes = async () => {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  if (!res.ok) throw new Error('Network response was not ok');
  const data: RecipesResponse = await res.json();
  return data.meals;
};

export const useGetRecipes = (category?: string) => {
  const query = useQuery({
    queryKey: category ? ['recipesByCategory', category] : ['allRecipes'],
    queryFn: category ? () => fetchRecipesByCategory(category) : fetchAllRecipes,
  });

  return query;
};
