import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategories } from "../../hooks/useGetCategories";
import "./CategoryPage.css";
import { Category } from "../../interfaces/interfaces";

const CategoryPage: React.FC = () => {
  const { isLoading, data: categories, error } = useGetCategories();
  const navigate = useNavigate();

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error)
    return (
      <div className="error">
        Error loading categories. Please try again later.
      </div>
    );

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/categories/${categoryName}`);
  };

  return (
    <div className="category-page">
      <h1>Categories</h1>
      <div className="category-view">
        <div className="category-list">
          {categories?.map((category: Category) => (
            <div
              key={category.idCategory}
              className="category-item"
              onClick={() => handleCategoryClick(category.strCategory)}
            >
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="category-thumb"
              />
              <h2 className="category-name">{category.strCategory}</h2>
              <p className="category-description">
                {category.strCategoryDescription.length > 260
                  ? `${category.strCategoryDescription.substring(0, 260)}...`
                  : category.strCategoryDescription}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
