import './App.css';
import CategoryPage from './components/CategoryPage/CategoryPage';
import RecipePage from './components/RecipesPage/RecipePage';
import RecipeDetails from './components/RecipeDetail/RecipeDetails';
import SelectedRecipesPage from './components/SelectedRecipesPage/SelectedRecipesPage';
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecipePage isFromCategory={undefined} />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route
          path="/categories/:category"
          element={<RecipePage isFromCategory />}
        />
        <Route
          path="/selected-recipes"
          element={<SelectedRecipesPage />}
        />
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
