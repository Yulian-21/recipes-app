export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    [key: string]: any;
  }
  
  export interface RecipesResponse {
    meals: Recipe[];
  }

export interface RecipeDetailsType {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    [key: `strIngredient${number}`]: string;
    [key: `strMeasure${number}`]: string;
  }

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }
  
  
  