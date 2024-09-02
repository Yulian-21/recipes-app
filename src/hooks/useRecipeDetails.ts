import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { RecipeDetailsType } from '../interfaces/interfaces';

const fetchRecipeDetails = async (id: string): Promise<RecipeDetailsType> => {
  const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  return data.meals[0];
};

export const useRecipeDetails = (id: string) => {
  return useQuery({
    queryKey: ['recipeDetails', id],
    queryFn: () => fetchRecipeDetails(id),
  });
};
