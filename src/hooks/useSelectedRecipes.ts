import { useState, useEffect } from 'react';
import { Recipe } from '../interfaces/interfaces';

const useSelectedRecipes = () => {
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const storedRecipes = localStorage.getItem('selectedRecipes');
    if (storedRecipes) {
      setSelectedRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedRecipes', JSON.stringify(selectedRecipes));
  }, [selectedRecipes]);

  const addRecipe = (recipe: Recipe) => {
    setSelectedRecipes(prevRecipes => [...prevRecipes, recipe]);
  };

  const removeRecipe = (recipeId: string) => {
    setSelectedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.idMeal !== recipeId));
  };

  return { selectedRecipes, addRecipe, removeRecipe };
};

export default useSelectedRecipes;
