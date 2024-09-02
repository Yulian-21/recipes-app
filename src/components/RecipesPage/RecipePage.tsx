import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetRecipes } from '../../hooks/useGetRecipes';
import { Recipe } from '../../interfaces/interfaces';
import useSelectedRecipes from '../../hooks/useSelectedRecipes';
import './RecipePage.css';

const ITEMS_PER_PAGE = 12;

interface RecipePageProps {
  isFromCategory: boolean | undefined;
}

const RecipePage = ({ isFromCategory }: RecipePageProps) => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const { data: recipes, isLoading } = useGetRecipes(isFromCategory ? (category || '') : undefined);
  const { selectedRecipes, addRecipe, removeRecipe } = useSelectedRecipes();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <div className="loading">Loading...</div>;

  const totalPages = Math.ceil(recipes?.length || 0 / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRecipes = recipes?.slice(startIndex, endIndex);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleAddRecipe = (recipe: Recipe) => {
    addRecipe(recipe);
  };

  const handleRemoveRecipe = (recipeId: string) => {
    removeRecipe(recipeId);
  };

  return (
    <div className="recipe-page">
      <h1 className="recipe-page-title">
        {isFromCategory ? `Recipes in ${category} Category` : 'Recipes'}
      </h1>
      <div className="recipe-list">
        {currentRecipes?.map((recipe: Recipe) => (
          <div
            key={recipe.idMeal}
            className="recipe-item"
            onClick={() => handleRecipeClick(recipe.idMeal)}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="recipe-thumb"
            />
            <div className="recipe-info">
              <h3 className="recipe-name">{recipe.strMeal}</h3>
              <p className="recipe-category">
                Category: {isFromCategory ? category : recipe.strCategory}
              </p>
              {recipe.strArea && (
                <p className="recipe-category">Origin: {recipe?.strArea}</p>
              )}
              <button
                className="recipe-action-button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedRecipes.find((r) => r.idMeal === recipe.idMeal)) {
                    handleRemoveRecipe(recipe.idMeal);
                  } else {
                    handleAddRecipe(recipe);
                  }
                }}
              >
                {selectedRecipes.find((r) => r.idMeal === recipe.idMeal)
                  ? 'Unselect Recipe'
                  : 'Select Recipe'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          {pageNumbers.slice(0, 9).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`pagination-button ${
                currentPage === pageNumber ? 'active' : ''
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          {totalPages > 10 && (
            <>
              <span className="pagination-ellipsis">...</span>
              <button
                className="pagination-button"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipePage;
