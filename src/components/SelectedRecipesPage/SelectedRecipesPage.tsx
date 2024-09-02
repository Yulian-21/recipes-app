import React from 'react';
import useSelectedRecipes from '../../hooks/useSelectedRecipes';
import { Recipe } from '../../interfaces/interfaces';
import './SelectedRecipesPage.css';

const SelectedRecipesPage: React.FC = () => {
  const { selectedRecipes, removeRecipe } = useSelectedRecipes();

  const getIngredients = (recipe: Recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  const aggregateIngredients = () => {
    const ingredientMap: { [key: string]: string } = {};
    selectedRecipes.forEach(recipe => {
      getIngredients(recipe).forEach(({ ingredient, measure }) => {
        if (ingredient) {
          if (ingredientMap[ingredient]) {
            ingredientMap[ingredient] = `${parseFloat(ingredientMap[ingredient]) + parseFloat(measure)} ${measure.replace(/^\d+/, '')}`;
          } else {
            ingredientMap[ingredient] = measure;
          }
        }
      });
    });
    return Object.entries(ingredientMap).map(([ingredient, measure]) => ({ ingredient, measure }));
  };

  return (
    <div className="selected-recipes-page">
      <div className="recipes-list">
        {selectedRecipes.length === 0 ? (
          <p>No recipes selected.</p>
        ) : (
          selectedRecipes.map((recipe: Recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-thumbnail" />
              <div className="recipe-content">
                <h2 className="recipe-title">{recipe.strMeal}</h2>
                <div className="ingredients">
                  <h3>Ingredients</h3>
                  <ul>
                    {getIngredients(recipe).map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.ingredient}: {ingredient.measure}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="instructions">
                  <h3>Instructions</h3>
                  <p>{recipe.strInstructions}</p>
                </div>
              </div>
              <button className="remove-button" onClick={() => removeRecipe(recipe.idMeal)}>Remove</button>
            </div>
          ))
        )}
      </div>
      {selectedRecipes.length > 0 && (
        <div className="aggregated-ingredients">
          <h2>Aggregated Ingredients</h2>
          <ul>
            {aggregateIngredients().map((ingredient, index) => (
              <li key={index}>
                {ingredient.ingredient}: {ingredient.measure}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectedRecipesPage;
