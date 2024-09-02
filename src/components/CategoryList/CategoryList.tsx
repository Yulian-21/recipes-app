import React from 'react';
import './CategoryList.css';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface CategoryListProps {
  categories: Category[];
  onCategoryClick: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategoryClick }) => {
  return (
    <div className="category-list">
      {categories.map(category => (
        <div 
          key={category.idCategory} 
          className="category-item" 
          onClick={() => onCategoryClick(category.strCategory)}
        >
          <img 
            src={category.strCategoryThumb} 
            alt={category.strCategory} 
            className="category-thumb"
          />
          <div className="category-info">
            <h3 className="category-name">{category.strCategory}</h3>
            <p className="category-description">
              {category.strCategoryDescription.substring(0, 100)}...
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
