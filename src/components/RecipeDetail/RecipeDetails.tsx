import React from "react";
import { useParams } from "react-router-dom";
import { useRecipeDetails } from "../../hooks/useRecipeDetails";
import useSelectedRecipes from "../../hooks/useSelectedRecipes";
import "./RecipeDetails.css";

const RecipeDetails: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data: recipe, isLoading, isError } = useRecipeDetails(recipeId || "");
  const { selectedRecipes, addRecipe } = useSelectedRecipes();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading recipe details.</p>;
  if (!recipe) return <p>No recipe found.</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  const isRecipeAdded = selectedRecipes.some(
    (selectedRecipe) => selectedRecipe.idMeal === recipe.idMeal
  );

  const handleAddRecipe = () => {
    if (!isRecipeAdded) {
      addRecipe(recipe);
    }
  };

  return (
    <div className="recipe-detail-page">
      <h1 className="recipe-title">{recipe.strMeal}</h1>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-thumbnail"
        />
      <div className="recipe-info">
        <p>
          <strong>Category:</strong> {recipe.strCategory}
        </p>
        <p>
          <strong>Area:</strong> {recipe.strArea}
        </p>
        <p>
          <strong>Instructions:</strong> {recipe.strInstructions}
        </p>
        <p>
          <strong>Tags:</strong> {recipe.strTags}
        </p>

        {ingredients.length > 0 && (
          <div>
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item.ingredient} - {item.measure}
                </li>
              ))}
            </ul>
          </div>
        )}

        {recipe.strYoutube && (
          <div className="youtube-link">
            <h2>Watch on YouTube</h2>
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Watch Video
            </a>
          </div>
        )}

        <button
          className="add-button"
          onClick={handleAddRecipe}
          disabled={isRecipeAdded}
        >
          {isRecipeAdded ? "Added to Selected" : "Add to Selected"}
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
